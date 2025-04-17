import React from 'react'
import cardImg from '../../../assets/images/product-card-img-1.png'
import { Link} from 'react-router-dom';

const Category = ({ category }) => {
    let categoryImage;

    try {
        categoryImage = require(`../../../assets${category.categoryImage.slice(2)}`);
    } catch (error) {
        console.log(error.message)
        categoryImage = cardImg;
    }
    return (
        <div className='product-card col-6'>
            <Link to={`products/${category.displayId}`}>
                <div className='card-img'>
                    <img src={categoryImage} alt="product" />
                    {/* <div className='whistlist'>
                        <FaRegHeart />
                    </div> */}
                </div>
                <div className='product-card-body'>
                    <button className='card-btn'>
                        {`${category.categoryName} (${category.itemCount} Items)`}
                    </button>
                </div>
            </Link>
        </div >
    )
}

export default Category
