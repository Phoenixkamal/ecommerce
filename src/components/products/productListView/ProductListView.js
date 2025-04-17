import React, { useContext, useEffect, useState } from 'react'
import './ProductListView.css'
import cardImg from '../../../assets/images/product-card-img-1.png'
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import api from '../../../api/api';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../contexts/Datacontext';
import { FaRegTrashAlt } from 'react-icons/fa';
import WishlistComp from '../wishlist/WishlistComp';


const ProductListView = ({ product, btnAddon, withTrash, setCounterRefresh, counterRefresh }) => {
    const { setWishlistCounterRefresh, wishlistCounterRefresh, } = useContext(DataContext)
    const [counter, setCounter] = useState(1)
    const userData = JSON.parse(localStorage.getItem('userdata'))
    const { setCartCount } = useContext(DataContext)
    const [productPrice, setProductPrice] = useState("")
    const [retailPrice, setRetailPrice] = useState("")
    const [productVarients, setProductVarients] = useState([])
    const [isDefaultId, setIsDefaultId] = useState("")


    let productImage;

    try {
        productImage = require(`../../../assets${product.productImagePath.slice(2)}`);
    } catch (error) {
        productImage = cardImg;
    }

    useEffect(() => {
        setProductVarients(product.varient)
        // setProductPrice(product.sellingPrice)
    }, [product.varient])

    useEffect(() => {
        const data = productVarients.filter((item) => item.isDefaultVarient === true)
        if (data.length) {
            setIsDefaultId(data[0].recordId)
            setProductPrice(data[0].sellingPrice)
            setRetailPrice(data[0].retailPrice)
        }
    }, [productVarients])

    async function handleDelete(id) {
        try {
            await api.get(`User/Wishlist?action=delete&userid=${userData.displayId}&productid=${id}`)
            setCounterRefresh(!counterRefresh)
            setWishlistCounterRefresh(!wishlistCounterRefresh)
        }
        catch (err) {
            console.log(err.message)
        }
    }


    async function addToCart() {
        const data = {
            cartdisplayid: userData.cartDisplayId,
            quantity: counter,
            productrid: isDefaultId,
            userdisplayid: userData.displayId
        }
        console.log(data)
        if (userData.displayId && isDefaultId) {
            try {
                const response = await api.post(`/User/AddToCart`, data)
                if (response.data.status === "OK") {
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

    const increement = () => {
        setCounter((prev) => prev + 1)
    }

    const decreement = () => {
        if (counter > 1) {
            setCounter((prev) => prev - 1)
        }
    }

    function handleRadioChange(id, price, retailprice) {
        setIsDefaultId(id)
        setProductPrice(price)
        setRetailPrice(retailprice)
    }

    return (
        <div className='product-list-view'>
            <div className='product-list-item'>
                <div className='product-list-image with-trash'>
                    <Link to={`${product.productId}`}>
                        <img src={productImage} alt='product' />
                    </Link>
                    {
                        !withTrash && (
                            <WishlistComp
                                setWishlistCounterRefresh={setWishlistCounterRefresh}
                                wishlistCounterRefresh={wishlistCounterRefresh}
                                productId={product.productId}
                                userDisplayId={userData.displayId}
                            />
                        )
                    }
                    {
                        withTrash && (
                            <div className='remove-btn' onClick={() => handleDelete(product.productId)}>
                                <div className='remove-btn-icon'><FaRegTrashAlt /></div>
                                <div className='remove-btn-name'>Remove</div>
                            </div>
                        )
                    }
                </div>
                <div className='product-list-content-wrap'>
                    <Link to={`${product.productId}`}>
                        <div className='list-item-name'>
                            <p>{product.productName}</p>
                        </div>
                    </Link>
                    <div className='list-item-price'>
                        <span className='selling-price mr-2'>₹{productPrice}</span>
                        <del className='retail-price text-muted'>₹{retailPrice}</del>
                    </div>
                    <div className='varianceList'>
                        {
                            productVarients &&
                            productVarients.map((varient, index) => (
                                <label className='product-list-variance  product-insight-variance mx-2' key={index}>
                                    <input className='variance-radio-input' type="radio" name={`radio-btn${btnAddon}`} checked={varient.recordId === isDefaultId} onChange={() => { handleRadioChange(varient.recordId, varient.sellingPrice, varient.retailPrice) }} />
                                    <span className={`category-name save-address-option mr-2  insight-save-address-option`}>
                                        <span className='mr-1'>{varient.varient}</span>{varient.unit}
                                    </span>
                                </label>
                            ))
                        }
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
