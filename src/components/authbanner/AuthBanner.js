import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthBanner = ({imageUrl,alt}) => {
    const navigate = useNavigate()
    const location = useLocation();
    const restrictedPaths = ['/newpwd','/login']

    function handleClick(){
        if (!restrictedPaths.includes(location.pathname)) {
            navigate(-1)
        }   
    }

    return (
        <div className='auth-container-img'>
            <img src={imageUrl} alt={alt} />

            <div className='return-back' onClick={handleClick}>
                <MdKeyboardArrowLeft />
            </div>
        </div>
    )
}

export default AuthBanner
