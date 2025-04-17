import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cardImg from '../../../assets/images/product-card-img-1.png'
import './EditProductList.css'
import { FaRegEdit } from 'react-icons/fa'

const EditProductList = ({ product, btnAddon,btnEdit }) => {
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
    }, [product.varient])

    useEffect(() => {
        const data = productVarients.filter((item) => item.isDefaultVarient === true)
        if (data.length) {
            setIsDefaultId(data[0].recordId)
            setProductPrice(data[0].sellingPrice)
            setRetailPrice(data[0].retailPrice)
        }
    }, [productVarients])

    function handleRadioChange(id, price, retailprice) {
        setIsDefaultId(id)
        setProductPrice(price)
        setRetailPrice(retailprice)
    }

    return (
        <div className='product-list-view'>
            <div className='edit-product-list-item'>
                <div className='product-list-image'>
                    <img src={productImage} alt='product' />
                </div>

                <div className='product-list-content-wrap'>
                    <div className='list-item-name'>
                        <p>{product.productName}</p>
                    </div>
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
                </div>
                    <Link to={`${product.productId}`} className='edit-prod-btn'>
                        <FaRegEdit />
                    </Link>
            </div>
        </div>
    )
}

export default EditProductList
