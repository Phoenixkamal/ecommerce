import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import cardImg from '../../../assets/images/product-card-img-1.png'
import './Product.css'
import api from '../../../api/api'
import { Link } from 'react-router-dom';
import { DataContext } from '../../../contexts/Datacontext';
import WishlistComp from '../wishlist/WishlistComp';
const Product = ({ product }) => {
    console.log(product)
    let productImage;
    const { setCartCount } = useContext(DataContext)
    const [productPrice, setProductPrice] = useState("")
    const [productVarients, setProductVarients] = useState([])
    const [isDefaultId, setIsDefaultId] = useState("")
    const { setWishlistCounterRefresh, wishlistCounterRefresh } = useContext(DataContext)

    try {
        productImage = require(`../../../assets${product.productImagePath.slice(2)}`);
    } catch (error) {
        productImage = cardImg;
    }

    useEffect(() => {
        setProductVarients(product.varient)
    }, [product.varient])

    useEffect(() => {
        const data = productVarients.filter((item) => item.isDefaultVarient === true)
        if (data.length) {
            setIsDefaultId(data[0].recordId)
            setProductPrice(data[0].sellingPrice)
        }
    }, [productVarients])

    const userData = JSON.parse(localStorage.getItem('userdata'))

    async function addToCart() {
        const data = {
            cartdisplayid: userData.cartDisplayId,
            quantity: 1,
            productrid: isDefaultId,
            userdisplayid: userData.displayId
        }
        if (userData.displayId) {
            try {
                const response = await api.post(`/User/AddToCart`, data)
                if (response.data.status === "OK") {
                    console.log(response)
                    setCartCount((prev) => prev + 1)
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
                <div className='card-img'>
                    <Link to={`${product.productId}`}>
                        <img src={productImage} alt="product" />
                    </Link>
                    <div className='wishlist-grid-vw-align'>
                        <WishlistComp
                            setWishlistCounterRefresh={setWishlistCounterRefresh}
                            wishlistCounterRefresh={wishlistCounterRefresh}
                            productId={product.productId}
                            userDisplayId={userData.displayId}
                        />
                    </div>
                </div>
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
                    <p className='price'>₹{productPrice}
                    </p>
                    <del className='price-striked text-muted'>₹{product.retailPrice}</del>
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
