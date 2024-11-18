import React from 'react'
import { FaRegHeart, FaStar } from "react-icons/fa";
import cardImg from '../../../assets/images/product-card-img-1.png'
import './Product.css'
import api from '../../../api/api'
import { Link } from 'react-router-dom';
const Product = ({ product }) => {
    console.log(product)
    let productImage;

    try {
        productImage = require(`../../../assets${product.productImagePath.slice(2)}`);
    } catch (error) {
        productImage = cardImg;
    }

    const userData = JSON.parse(localStorage.getItem('userdata'))

    async function addToCart() {
        const data = {
            cartdisplayid: userData.cartDisplayId,
            quantity: 1,
            productrid: product.recordId,
            userdisplayid: userData.displayId
        }
        if (userData.displayId) {
            try {
                const response = await api.post(`/User/AddToCart`, data)
                if (response.data.status === "OK") {
                    console.log(response)
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
    return (
        <div className='card-wrapper col-6'>
            <div className='product-card '>
                <Link to={`${product.productId}`}>
                    <div className='card-img'>
                        <img src={productImage} alt="product-image" />
                        <div className='whistlist'>
                            <FaRegHeart />
                        </div>
                    </div>
                </Link>
                <div className='product-card-body'>
                    <button className='card-btn' onClick={addToCart}>
                        Add To Cart
                    </button>
                </div>
            </div>
            <div className='card-content'>
                <div className='card-content-head'>
                    <h6>
                        {product.productName}
                    </h6>
                </div>
                <div className='product-description'>
                    <p className='price'>${product.sellingPrice}
                    </p>
                    <del className='price-striked text-muted'>${product.retailPrice}</del>
                    <div className='ratings'>
                        <div className='star-icon'>
                            <FaStar />
                        </div>
                        <div className='review text-muted'>
                            (2k Review)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
