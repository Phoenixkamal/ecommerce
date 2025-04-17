import React, {  useState } from 'react'
import cardImg from '../../assets/images/product-card-img-1.png'
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import api from '../../api/api';
import { FaRegTrashAlt } from "react-icons/fa";
import './CartListView.css'

const CartListView = ({product , setCounterRefresh , counterRefresh}) => {
    const [counter, setCounter] = useState(product.qty)
    const userData = JSON.parse(localStorage.getItem('userdata'))

    let productImage;

    try {
        productImage = require(`../../assets${product.productImagePath.slice(2)}`);
    } catch (error) {
        productImage = cardImg;
    }

    const increement = () => {
        const response = handleQty(counter+1)
        response.then((res)=>{
            if(res){
                setCounter((prev) => prev + 1)
                setCounterRefresh(!counterRefresh)
            }
        })
    }

    const decreement = () => {
        if (counter > 1) {
            const response = handleQty(counter-1)
            response.then((res)=>{
                if(res){
                    setCounter((prev) => prev - 1)
                    setCounterRefresh(!counterRefresh)
                }
            })
        }
    }

    async function handleQty(counter){
        try{
            const response = await api.put(`/user/updatecartitem?linerid=${product.recordId}&qty=${counter}`)
            if(response.data.status==='OK'){
                return true
            }
            setCounterRefresh(!counterRefresh)
        }
        catch(err){
            console.log(err.message)
        }
    }


    async function handleDelete(id) {
        try {
          await api.delete(`/user/deletecartitem?cartdisplayid=${userData.cartDisplayId}&cartrid=${id}`)
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
                    <img src={productImage} alt='product' />
                </div>
                <div className='product-list-content-wrap'>
                    <div className='list-item-name'>
                        <p>{product.productName}</p>
                    </div>
                    <div className='list-item-price'>
                        <span className='selling-price mr-2'>
                        ₹{product.sellingPrice}</span>
                        <del className='retail-price text-muted'>
                        ₹{product.retailPrice}</del>
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
