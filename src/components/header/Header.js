import React from 'react'
import { FaRegBell } from 'react-icons/fa6'
import { IoSearchOutline } from 'react-icons/io5'
import './Header.css'
import optionalImage from '../../assets/images/product-category-1.png'
import { Link } from 'react-router-dom'

const Header = () => {
    const username = JSON.parse(localStorage.getItem('userdata')).userName || "User"
    const userData = JSON.parse(localStorage.getItem('userdata'))

    let profileImage;

    try {
        const imageName = userData.profileImage.slice('/assets/custom-assets/Image/'.length)
        profileImage = require(`../../assets/UploadedImages/profileimages/${imageName}`);
    } catch (error) {
        console.log(error.message)
        profileImage = optionalImage;
    }

    return (
        <header className='product-header header'>
            <div className='profile'>
                <div className='profile-img'>
                    <img src={profileImage} alt='profile' />
                </div>
                <div className='profile-name'>
                    {`Hello ${username}`}
                </div>
            </div>
            <div className='header-icons'>
                <Link to="/notification">
                    <div className='notification'>
                        <FaRegBell />
                    </div>
                </Link>
                <div className='search'>
                    <IoSearchOutline />
                </div>
            </div>
        </header>
    )
}

export default Header
