import React from 'react'
import { FaRegHeart, FaStar } from "react-icons/fa";
import cardImg from '../../assets/images/product-card-img-1.png'
import './Product.css'

const Product = ({ product }) => {
    let productImage;

    try {
        productImage = require(`../../assets${product.productImagePath.slice(2)}`);
    } catch (error) {
        productImage = cardImg;
    }
    return (
        <div className='card-wrapper col-6'>
            <div className='product-card '>
                <div className='card-img'>
                    <img src={productImage} alt="product-image" />
                    <div className='whistlist'>
                        <FaRegHeart />
                    </div>
                </div>
                <div className='product-card-body'>
                    <button className='card-btn'>
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
