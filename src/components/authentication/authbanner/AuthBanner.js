import React from 'react'
import "./AuthBanner.module.css"
import ReturnBack from '../../../components/returnback/ReturnBack'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const AuthBanner = ({imageUrl,alt}) => {

    return (
        <div className='auth-container-img'>
            <img src={imageUrl} alt={alt} />
            <ReturnBack>
                <MdKeyboardArrowLeft />
            </ReturnBack>
        </div>
    )
}

export default AuthBanner
