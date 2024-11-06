import React, { Suspense, useContext } from 'react'
import './Category.css'
import categoryImg from '../../../assets/images/product-category-1.png'
import { DataContext } from '../../../contexts/Datacontext';
const CategoryList = React.lazy(() => import('../../../components/categorylist/CategoryList'))



const Category = () => {
    const { categories } = useContext(DataContext)

    return (
        <section className='category-page'>
            {/* <header className='product-header'>
                <div className='header-title'>
                    <h4>Category</h4>
                </div>
                <div className='search'>
                    <div className='icon'>
                        <IoSearch />
                    </div>
                </div>
            </header> */}
            <main className='category-page-content'>
                <div className='category-sec-1'>
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
                </div>
                <Suspense fallback="...loading">
                    <CategoryList
                        categories={categories}
                    />
                </Suspense>
            </main>
            {/* <footer className='product-footer'>
                <div className='icon'>
                    <LuHome/>
                </div>
                <div className='icon'>
                    <FaRegHeart/>
                </div>
                <div className='icon'>
                    <IoCartOutline/>
                </div>
                <div className='icon'>
                    <IoIosPaper/>
                </div>
                <div className='icon'>
                    <IoPersonOutline/>
                </div>
            </footer> */}
        </section>
    )
}

export default Category
