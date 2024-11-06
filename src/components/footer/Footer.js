import React from 'react'
import { IoCartOutline, IoPersonOutline } from 'react-icons/io5'
import { LuHome } from 'react-icons/lu'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className='product-footer'>
            <div className='icon' onClick={()=>{navigate('/dashboard/')}}>
                <LuHome />
            </div>
            <div className='icon' onClick={()=>{navigate('/dashboard/products')}}>
                <IoNewspaperOutline />
            </div>
            <div className='icon'>
                <IoCartOutline />
            </div>
            <div className='icon'>
                <HiOutlineShoppingBag />
            </div>
            <div className='icon'>
                <IoPersonOutline />
            </div>
        </footer>
    )
}

export default Footer
