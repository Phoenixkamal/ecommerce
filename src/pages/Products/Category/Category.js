import React, {  useContext } from 'react'
import './Category.css'
import { DataContext } from '../../../contexts/Datacontext';
import CategoryList from '../../../components/products/categorylist/CategoryList';

const Category = () => {
    const { categories } = useContext(DataContext)

    return (
        <section className='category-page'>
            <main className='category-page-content'>
                {/* <div className='category-sec-1'>
                    <div className='category-sec-1-head'>
                        <h5>
                            Set Your Wardrobe With Our Amazing Selection!
                        </h5>
                    </div>
                </div>
                <div className='category-list row'>
                    <div className='category col-4'>
                        <div className='category-img'>
                            <img src={categoryImg} alt='product-image' />
                        </div>
                        <button className='category-name'>
                            Child
                        </button>
                    </div>
                    <div className='category col-4'>
                        <div className='category-img'>
                            <img src={categoryImg} alt='product-image' />
                        </div>
                        <button className='category-name'>
                            Child
                        </button>
                    </div>
                    <div className='category col-4'>
                        <div className='category-img'>
                            <img src={categoryImg} alt='product-image' />
                        </div>
                        <button className='category-name'>
                            Child
                        </button>
                    </div>
                </div> */}
                <div className='mb-5'>
                    <CategoryList
                        categories={categories}
                    />
                </div>
            </main>
        </section>
    )
}

export default Category
