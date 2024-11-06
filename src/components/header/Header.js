import React, { useContext } from 'react'
import { FaRegBell } from 'react-icons/fa6'
import { IoSearchOutline } from 'react-icons/io5'
import categoryImg from '../../assets/images/product-category-1.png'
import './Header.css'
import { DataContext } from '../../contexts/Datacontext'

const Header = () => {
    const {userData} = useContext(DataContext)
      const username = userData.userName || "User"
    return (
        <header className='product-header header'>
            <div className='profile'>
                <div className='profile-img'>
                    <img src={categoryImg} alt='profile' />
                </div>
                <div className='profile-name'>
                    {`Hello ${username}`}
                </div>
            </div>
            <div className='header-icons'>
                <div className='notification'>
                    <FaRegBell />
                </div>
                <div className='search'>
                    <IoSearchOutline />
                </div>
            </div>
        </header>
    )
}

export default Header
