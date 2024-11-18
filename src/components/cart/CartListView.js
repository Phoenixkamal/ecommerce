import React, { useEffect, useState } from 'react'
import cardImg from '../../assets/images/product-card-img-1.png'
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import api from '../../api/api';
import { FaRegTrashAlt } from "react-icons/fa";
import './CartListView.css'

const CartListView = ({product ,setFilterId, setCounterRefresh , counterRefresh}) => {
    const [counter, setCounter] = useState(product.qty)
    const userData = JSON.parse(localStorage.getItem('userdata'))

    let productImage;

    try {
        productImage = require(`../../assets${product.productImagePath.slice(2)}`);
    } catch (error) {
        productImage = cardImg;
    }

    
    const [clicked, setClicked] = useState({ variance1: "", variance2: "" })

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

    useEffect(()=>{
        async function handleQty(){
            try{
                await api.put(`/user/updatecartitem?linerid=${product.recordId}&qty=${counter}`)
                console.log(product)
            }
            catch(err){
                console.log(err.message)
            }
        }
        setCounterRefresh(!counterRefresh)
        handleQty()
    },[counter])

    async function handleDelete(id) {
        try {
          await api.delete(`/user/deletecartitem?cartdisplayid=${userData.cartDisplayId}&cartrid=${id}`)
          setFilterId(id)
          setCounterRefresh(!counterRefresh)
        }
        catch (err) {
          console.log(err.message)
        }
      }

    return (
        <div className='product-list-view'>
            <div className='product-list-item'>
                <div className='product-list-image'>
                    <img src={productImage} alt='product-image' />
                </div>
                <div className='product-list-content-wrap'>
                    <div className='list-item-name'>
                        <p>{product.productName}</p>
                    </div>
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
                    <div className='product-list-wrapper mt-3'>
                        <div className='product-counter'>
                            <AiFillMinusCircle className='counter mr-2' onClick={decreement} />
                            {counter}
                            <IoMdAddCircle className='counter ml-2' onClick={increement} />
                        </div>
                        <div className='remove-btn'>
                            <div className='remove-btn-icon'><FaRegTrashAlt/></div>
                            <div className='remove-btn-name' onClick={()=>handleDelete(product.recordId)}>Remove</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartListView
