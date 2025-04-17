import React, { useContext } from 'react'
import { IoCartOutline, IoPersonOutline } from 'react-icons/io5'
import { LuHome } from 'react-icons/lu'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { DataContext } from '../../contexts/Datacontext';

const Footer = () => {
    const { cartCount } = useContext(DataContext)

    return (
        <footer className='product-footer'>
            <Link className='icon' to="/dashboard">
                <LuHome />
            </Link>
            <Link className='icon' to="/dashboard/category">
                <IoNewspaperOutline />
            </Link>
            <Link className='icon' to="/dashboard/cart">
                <IoCartOutline />
                <div className='cart-length'>
                    {
                        cartCount
                    }
                </div>
            </Link>
            <Link className='icon' to="/dashboard/orders">
                <HiOutlineShoppingBag />
            </Link>
            <Link className='icon' to='/dashboard/userprofile'>
                <IoPersonOutline />
            </Link>
        </footer>
    )
}

export default Footer
