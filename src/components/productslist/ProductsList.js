import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import cardImg from '../../assets/images/product-card-img-1.png'

// http://localhost:5145/user/products?categoryid=3e85ca1f-91c2-42f2-9b05-bd920051c25e

const ProductsList = ({ categories }) => {
    console.log(categories)
    return (
        <div className='products-list row'>
            {
                categories.map((category,index) => (
                    <div className='product-card col-6' key={index}>
                        <div className='card-img'>
                            <img src={require(`../../assets${category.categoryImage.slice(2)}`)} alt="product-image" />
                            <div className='whistlist'>
                                <FaRegHeart />
                            </div>
                        </div>
                        <div className='product-card-body'>
                            <button className='card-btn'>
                                {`${category.categoryName} (${category.itemCount} Items)`}
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductsList
