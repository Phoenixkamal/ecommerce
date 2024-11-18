import React from 'react'
import './ProductSkeleton.css'

const ProductSkeleton = () => {
  return (
    <div className='card-wrapper col-6'>
            <div className='product-card skeleton'>
                    <div className='card-img'>
                        <img src="" alt="product-image" />
                        <div className='whistlist'>
                        </div>
                    </div>
                <div className='product-card-body'>
                    <button className='card-btn skeleton'>
                        Add To Cart
                    </button>
                </div>
            </div>
            <div className='card-content skeleton'>
                <div className='card-content-head'>
                    <h6>
                       
                    </h6>
                </div>
                <div className='product-description'>
                    <p className='price'>
                    </p>
                    <del className='price-striked text-muted'></del>
                    <div className='ratings'>
                        <div className='star-icon'>
                        </div>
                        <div className='review text-muted'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ProductSkeleton
