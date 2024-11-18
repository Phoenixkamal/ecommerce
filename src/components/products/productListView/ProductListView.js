import React, { useContext, useState } from 'react'
import './ProductListView.css'
import cardImg from '../../../assets/images/product-card-img-1.png'
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import api from '../../../api/api';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../contexts/Datacontext';

const ProductListView = ({ product }) => {
    const [counter, setCounter] = useState(1)
    const userData = JSON.parse(localStorage.getItem('userdata'))
    const [clicked, setClicked] = useState({ variance1: "", variance2: "" })
    const {setCartCount} = useContext(DataContext)

    let productImage;

    try {
        productImage = require(`../../../assets${product.productImagePath.slice(2)}`);
    } catch (error) {
        productImage = cardImg;
    }


    async function addToCart() {
        const data = {
            cartdisplayid: userData.cartDisplayId,
            quantity: 1,
            productrid: product.recordId,
            userdisplayid: userData.displayId
        }
        console.log(data)
        if (userData.displayId) {
            try {
                const response = await api.post(`/User/AddToCart`, data)
                if (response.data.status === "OK") {
                    console.log(response)
                    setCartCount((prev)=>prev+1)
                }
                else {
                    console.log(response.data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }
    }


    function handleClick(e) {
        setClicked({
            [e.target.name]: e.target.value
        })
    }

    const increement = () => {
        setCounter((prev) => prev + 1)
    }

    const decreement = () => {
        if (counter > 1) {
            setCounter((prev) => prev - 1)
        }
    }

    return (
        <div className='product-list-view'>
            <div className='product-list-item'>
                <Link to={`${product.productId}`}>
                    <div className='product-list-image'>
                        <img src={productImage} alt='product-image' />
                    </div>
                </Link>
                <div className='product-list-content-wrap'>
                    <Link to={`${product.productId}`}>
                        <div className='list-item-name'>
                            <p>{product.productName}</p>
                        </div>
                    </Link>
                    <div className='list-item-price'>
                        <span className='selling-price mr-2'>${product.sellingPrice}</span>
                        <del className='retail-price text-muted'>${product.retailPrice}</del>
                    </div>
                    <div className='product-list-variance'>
                        <button className={`category-name save-address-option mr-2 ${clicked.variance1 ? "save-address-option-btn-active" : ""}`} value={"500g"} onClick={handleClick} name='variance1'>
                            500g
                        </button>
                        <button className={`category-name save-address-option ${clicked.variance2 ? "save-address-option-btn-active" : ""}`} value={"1Kg"} onClick={handleClick} name='variance2'>
                            1Kg
                        </button>
                    </div>
                    <div className='product-list-wrapper'>
                        <div className='product-counter'>
                            <AiFillMinusCircle className='counter mr-2' onClick={decreement} />
                            {counter}
                            <IoMdAddCircle className='counter ml-2' onClick={increement} />
                        </div>
                        <button className='add-to-card-btn update-profile-btn ' onClick={addToCart}>
                            <IoCartOutline className='cart-icon' />Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductListView
