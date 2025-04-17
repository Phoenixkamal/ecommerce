import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ReturnBack = ({children}) => {
    const navigate = useNavigate()
    const location = useLocation();
    const restrictedPaths = ['/newpwd','/login']

    function handleClick(){
        if (!restrictedPaths.includes(location.pathname)) {
            navigate(-1)
        }   
    }
    return (
        <div className='return-back' onClick={handleClick}>
            {children}
        </div>
    )
}

export default ReturnBack
