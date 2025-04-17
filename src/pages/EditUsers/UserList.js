import React, { useEffect, useState } from 'react'
import optionalImage from '../../assets/images/product-card-img-1.png'
import { FaUserEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const UserList = ({ user}) => {
    const [firstTry, setFirstTry] = useState(true)
    // let profileImage
    const [profileImage,setProfileImage] =  useState("")

    useEffect(() => {
        try {
            const imageName = user.profileImage.slice('/assets/custom-assets/Image/'.length)
            setProfileImage(require(`../../assets/UploadedImages/profileimages/${imageName}`))
        } catch (error) {
            setFirstTry(false)
            setProfileImage(optionalImage)
        }
        if (!firstTry) {
            try {
                let imageName = user.profileImage.slice('/assets/UploadedImages/Users/'.length)
                setProfileImage(require(`../../assets/UploadedImages/Users/${imageName}`))
            } catch (error) {
                setProfileImage(optionalImage)
            }
        }
    }, [user,firstTry])
    return (
        <>
            <div className='order  edit-user-list edit-category-list-item'>
                <div className='edit-category-image'>
                    <img src={profileImage} alt="profile" />
                </div>
                <div className='edit-category-list-item-name user-list-name'>
                {user.userName || "User"} 
                <div className='text-muted '>
                    ({user.role})
                </div>
            </div>
                <Link className='adduserbtn' style={{fontSize:"25px",cursor:'pointer'}} to={user.displayId}>
                <FaUserEdit />
                </Link>
     
            </div>
        </>
    )
}

export default UserList
