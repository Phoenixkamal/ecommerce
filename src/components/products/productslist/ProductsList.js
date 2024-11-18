import React, { useContext } from 'react'
import Product from '../product/Product';
import ProductListView from '../productListView/ProductListView';
import { DataContext } from '../../../contexts/Datacontext';

const ProductsList = ({ products}) => {
    const {listView} = useContext(DataContext)
    return (
        <div className='products-list row'>
            {
                listView ? 
                products.map((product, index) => (
                    <ProductListView
                        key={index}
                        product={product}
                    />
                )) : products.map((product, index) => (
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
