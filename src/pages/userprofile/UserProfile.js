import React from 'react'
import './UserProfile.css'
import brand_image from '../../assets/custom-assets/Image/logo.png'
import { FaAngleRight, FaRegBell } from 'react-icons/fa6'
import optionalImage from '../../assets/images/product-card-img-1.png'
import OrderInfoBtns from '../../components/ordersinfo/OrderInfoBtns/OrderInfoBtns'
import { GoBell, GoLocation, GoPerson } from "react-icons/go";
import { Link } from 'react-router-dom'

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

    const btnStyle = {
        border: '1px solid white',
        backgroundColor: 'white',
        boxShadow: '0px 5px 10px 0px rgba(187, 107, 0, 0.1)',
        color: 'black'
    }
    const UserData = JSON.parse(localStorage.getItem('userdata'))
    return (
        <section className='userprofile'>
            <header className='userprofile-header'>
                <div className='userprofile-header-brand'>
                    <img src={brand_image} alt='brand-name' />
                </div>
                <Link to='/notification'>
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
                <div className='userprofile-btns'>
                    <OrderInfoBtns
                        btnStyle={btnStyle}
                    />
                </div>
                <div className='account-settings'>
                    <div className='account-setting-header'>
                        <h5>Account Settings</h5>
                    </div>
                    <ul className='account-setting-list'>
                        <li className='account-setting-list-items'>
                            <div className='list-item-icon'>
                                <GoPerson />
                            </div>
                            <Link to="/editprofile" className='option-name'>
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
                            <Link to="/savedaddress" className='option-name'>
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
                            <Link to="/notification" className='option-name'>
                                Notifications
                            </Link>
                            <div className='goNext'>
                                <FaAngleRight />
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </section>
    )
}

export default UserProfile
