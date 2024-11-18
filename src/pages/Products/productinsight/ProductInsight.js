import React, { useEffect, useState } from 'react'
import './ProductInsight.css'
import SecondaryHeader from '../../../components/secondaryheader/SecondaryHeader'
import { useParams } from 'react-router-dom';
import api from '../../../api/api';
import cardImg from '../../../assets/images/product-card-img-1.png'
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoCartOutline } from 'react-icons/io5';

const ProductInsight = () => {
    const [productDetails, setProductDetails] = useState({})
    const [productVarients, setProductVarients] = useState([])
    const userData = JSON.parse(localStorage.getItem('userdata'))
    const { id } = useParams()
    const [counter, setCounter] = useState(1)
    const increement = () => {
        setCounter((prev) => prev + 1)
    }

    const decreement = () => {
        if (counter > 1) {
            setCounter((prev) => prev - 1)
        }
    }

    let productImage;

    try {
        productImage = require(`../../../assets${productDetails.productImagePath.slice(2)}`);
    } catch (error) {
        productImage = cardImg;
    }

    useEffect(() => {
        async function getProductDetails() {
            try {
                const response = await api.get(`/user/productdetails?productid=${id}`)
                console.log(response)
                setProductDetails(response.data.responsedata.productDetail)
                setProductVarients(response.data.responsedata.varients)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getProductDetails()
    }, [])

    async function addToCart() {
        const data = {
            cartdisplayid: userData.cartDisplayId,
            quantity: 1,
            productrid: productDetails.recordId,
            userdisplayid: userData.displayId
        }
        console.log(data)
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
        <div className='product-insight'>
            <SecondaryHeader
                title={"Product Details"}
            />
            <main className='productInsightContent'>
                <div className='product-insight-image'>
                    <img src={productImage} alt='product-image'/>
                </div>
                <div className='productInsightContentBody'>
                    <div className='productCategory'>{productDetails.category}</div>
                    <div className='productName'>{productDetails.productName}</div>
                    <div className='productPrice mt-4'>
                        <div className='tag'>Price:</div>
                        <div className='price'>₹{productDetails.sellingPrice}.00</div>
                    </div>
                    <div className='productCounter mt-4'>
                        <div className='tag'>Quantity:</div>
                        <div className='product-counter'>
                            <AiFillMinusCircle className='counter mr-2' onClick={decreement} />
                            {counter}
                            <IoMdAddCircle className='counter ml-2' onClick={increement} />
                        </div>
                    </div>
                    <div className='productDescription mt-4'>
                        <div className='tag'>Description:</div>
                        <div className='description'>
                            {productDetails.productName}
                        </div>
                    </div>
                </div>
                    <button className='update-profile-btn save-address' onClick={addToCart}>
                    <IoCartOutline className='cart-icon mr-2 product-insight-cart'/>Add To Cart
                    </button>
            </main>
        </div>
    )
}

export default ProductInsight
