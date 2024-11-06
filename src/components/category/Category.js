import React, { useContext } from 'react'
import { FaRegHeart } from "react-icons/fa";
import cardImg from '../../assets/images/product-card-img-1.png'
import { DataContext } from '../../contexts/Datacontext'
import { useNavigate } from 'react-router-dom';

const Category = ({ category }) => {
    const { setCategoryId } = useContext(DataContext)
    const navigate = useNavigate()
    let categoryImage;

    try {
        categoryImage = require(`../../assets${category.categoryImage.slice(2)}`);
    } catch (error) {
        categoryImage = cardImg;
    }
    function viewProducts() {
        navigate('/dashboard/products')
        setCategoryId(category.displayId)
    }
    return (
        <div className='product-card col-6' onClick={viewProducts}>
            <div className='card-img'>
                <img src={categoryImage} alt="product-image" />
                <div className='whistlist'>
                    <FaRegHeart />
                </div>
            </div>
            <div className='product-card-body'>
                <button className='card-btn'>
                    {`${category.categoryName} (${category.itemCount} Items)`}
                </button>
            </div>
        </div >
    )
}

export default Category
