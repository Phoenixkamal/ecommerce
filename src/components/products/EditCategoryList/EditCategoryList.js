import React from 'react'
import './EditCategoryList.css'
import cardImg from '../../../assets/images/product-card-img-1.png'
import { Link } from 'react-router-dom';

const EditCategoryList = ({ category, editbtn }) => {
    let categoryImage;

    try {
        categoryImage = require(`../../../assets${category.categoryImage.slice(2)}`);
    } catch (error) {
        console.log(error.message)
        categoryImage = cardImg;
    }
    return (
        <li className='order edit-category-list-item'>
            <div className='edit-category-image'>
                <img src={categoryImage} alt="products" />
            </div>
            <div className='edit-category-list-item-name'>
                {category.categoryName} 
                <div className='text-muted '>
                ({category.itemCount} Products)
                </div>
            </div>
            {
                editbtn &&
                <div className='navigate-btns'>
                    <div className='black-btn inventory-btn'>
                        <Link className='edit-category-btn' to={`${category.recordId}`}>
                             Edit
                        </Link>
                    </div>
                    <div className='black-btn inventory-btn'>
                        <Link className='edit-category-btn align-self-center' to={`editproductlist/${category.displayId}`}>
                            View
                        </Link>
                    </div>
                </div>
            }
            <div>
                {
                      !editbtn &&
                      <div className='navigate-btns'>
                          <div className='black-btn inventory-btn'>
                              <Link className='edit-category-btn' to={`editcategorylist/${category.categoryRId}`}>
                                   Edit
                              </Link>
                          </div>
                          <div className='black-btn inventory-btn'>
                              <Link className='edit-category-btn align-self-center' to={`${category.categoryRId}`}>
                                  View
                              </Link>
                          </div>
                      </div>
                }
            </div>
        </li>
    )
}

export default EditCategoryList
