import React from 'react'
import Category from '../category/Category';

const CategoryList = ({ categories }) => {
    return (
        <div className='products-list row'>
            {
                categories.map((category, index) => (
                    <Category
                        key={index}
                        category={category}
                    />
                ))
            }
        </div>
    )
}

export default CategoryList
