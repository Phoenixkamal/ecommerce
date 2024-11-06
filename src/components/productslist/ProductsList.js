import React from 'react'
import Product from '../product/Product';

const ProductsList = ({ products }) => {
    return (
        <div className='products-list row'>
            {
                products.map((product, index) => (
                    <Product
                        key={index}
                        product={product}
                    />
                ))
            }
        </div>
    )
}

export default ProductsList
