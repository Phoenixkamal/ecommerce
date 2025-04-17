import React from 'react'
import authStyles from "./AuthBanner.module.css"
import ReturnBack from '../../../components/returnback/ReturnBack'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const AuthBanner = ({imageUrl,alt}) => {

    return (
        <div className='auth-container-img'>
            <img src={imageUrl} alt={alt} />
            <div className={authStyles.returnBack}>
            <ReturnBack >
                <MdKeyboardArrowLeft />
            </ReturnBack>
            </div>
        </div>
    )
}

export default AuthBanner
