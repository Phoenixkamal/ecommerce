import React from 'react'
import './UserProfile.css'
import brand_image from '../../assets/custom-assets/Image/logo.png'
import { FaAngleRight, FaRegBell } from 'react-icons/fa6'
import optionalImage from '../../assets/images/product-card-img-1.png'
import { GoBell, GoLocation, GoPerson } from "react-icons/go";
import { Link } from 'react-router-dom'
import { BsGrid } from 'react-icons/bs'
import { LiaUserEditSolid, LiaWarehouseSolid } from 'react-icons/lia'
import { IoMdHeartEmpty } from 'react-icons/io'
const UserProfile = () => {

    const userData = JSON.parse(localStorage.getItem('userdata'))

    let profileImage;

    try {
        const imageName = userData.profileImage.slice('/assets/custom-assets/Image/'.length)
        profileImage = require(`../../assets/UploadedImages/profileimages/${imageName}`);
    } catch (error) {
        console.log(error.message)
        profileImage = optionalImage;
    }

    try {
        let imageName = userData.profileImage.slice('/assets/UploadedImages/Users/'.length)
        profileImage = require(`../../assets/UploadedImages/Users/${imageName}`);
    } catch (error) {
        console.log(error.message)
        profileImage = optionalImage;
    }
    const UserData = JSON.parse(localStorage.getItem('userdata'))




    return (
        <section className='userprofile'>
            <header className='userprofile-header'>
                <div className='userprofile-header-brand'>
                    <img src={brand_image} alt='brand-name' />
                </div>
                <Link to='/dashboard/notification'>
                    <div className='notification'>
                        <FaRegBell />
                    </div>
                </Link>
            </header>
            <main className='userprofile-content'>
                <div className='profile-greeting'>
                    <div className='profile-greeting-profile'>
                        <img src={profileImage} alt='profile' />
                    </div>
                    <div className='greetings'>
                        Hello <b>{UserData.userName}</b>
                    </div>
                </div>
                {/* <div className='userprofile-btns'>
                    <OrderInfoBtns
                        btnStyle={btnStyle}
                    />
                </div> */}
                <div className='account-settings mt-5'>
                    <div className='account-setting-header'>
                        <h5>Account Settings</h5>
                    </div>
                    <ul className='account-setting-list'>
                        <li className='account-setting-list-items'>
                            <div className='list-item-icon'>
                                <GoPerson />
                            </div>
                            <Link to="/dashboard/editprofile" className='option-name'>
                                Edit Profile
                            </Link>
                            <div className='goNext'>
                                <FaAngleRight />
                            </div>
                        </li>
                        <li className='account-setting-list-items'>
                            <div className='list-item-icon'>
                                <GoLocation />
                            </div>
                            <Link to="/dashboard/savedaddress" className='option-name'>
                                Saved Addresses
                            </Link>
                            <div className='goNext'>
                                <FaAngleRight />
                            </div>
                        </li>
                        <li className='account-setting-list-items'>
                            <div className='list-item-icon'>
                                <GoBell />
                            </div>
                            <Link to="/dashboard/notification" className='option-name'>
                                Notifications
                            </Link>
                            <div className='goNext'>
                                <FaAngleRight />
                            </div>
                        </li>
                        <li className='account-setting-list-items'>
                            <div className='list-item-icon'>
                            <IoMdHeartEmpty />
                            </div>
                            <Link to="/dashboard/wishlist" className='option-name'>
                                Wishlist
                            </Link>
                            <div className='goNext'>
                                <FaAngleRight />
                            </div>
                        </li>

                    </ul>
                    {
                        userData.role === "Admin" &&
                        <div>
                            <div className='account-setting-header'>
                                <h5>Admin Settings</h5>
                            </div>
                            <ul className='account-setting-list'>
                                <li className='account-setting-list-items'>
                                    <div className='list-item-icon'>
                                        <BsGrid />
                                    </div>
                                    <Link to="/dashboard/editcategorylist" className='option-name mt-2'>
                                        Inventory Management
                                    </Link>
                                    <div className='goNext'>
                                        <FaAngleRight />
                                    </div>
                                </li>
                                <li className='account-setting-list-items'>
                                    <div className='list-item-icon'>
                                        <LiaUserEditSolid />
                                    </div>
                                    <Link to="/dashboard/edituserslist" className='option-name mt-2'>
                                        User Management
                                    </Link>
                                    <div className='goNext'>
                                        <FaAngleRight />
                                    </div>
                                </li>
                                <li className='account-setting-list-items'>
                                    <div className='list-item-icon'>
                                    <LiaWarehouseSolid />
                                    </div>
                                    <Link to="/dashboard/warehouselist" className='option-name mt-2'>
                                        Wareshouse Management
                                    </Link>
                                    <div className='goNext'>
                                        <FaAngleRight />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </main>
        </section>
    )
}

export default UserProfile
