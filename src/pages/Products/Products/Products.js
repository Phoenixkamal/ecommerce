import React, { Suspense, useContext } from 'react'
import './Products.css'
import productBanner from "../../../assets/images/product-banner-1.png"
import { DataContext } from '../../../contexts/Datacontext';
const ProductsList = React.lazy(() => import('../../../components/productslist/ProductsList'))
// import { Swiper, SwiperSlide } from 'swiper/react';

const Products = () => {
    const { products } = useContext(DataContext)
    return (
        <section className='products-page'>
            {/* <header className='product-page-header product-header'>
                <div className='product-header-return-back'>
                    <FaAngleLeft />
                </div>
                <div className='search-box-wrap'>
                    <div className='search-icon'>
                        <IoSearch />
                    </div>
                    <form className='search-box'>
                        <input type='text' placeholder='Search Products' />
                    </form>
                </div>
                <div className='product-view'>
                    <FaListUl />
                </div>
                <div className='cart'>
                    <IoCartOutline />
                </div>
            </header> */}
            <main className='category-page-content'>
                {/* <div className='product-category category-list swiper-container'>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={3}
                    >
                        <SwiperSlide>
                            <button className='category-name mr-2 swiper-slide'>
                                Child
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button className='category-name mr-2 swiper-slide'>
                                Child
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button className='category-name mr-2 swiper-slide'>
                                Child
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button className='category-name mr-2 swiper-slide'>
                                Child
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button className='category-name mr-2 swiper-slide'>
                                Child
                            </button>
                        </SwiperSlide>
                        <SwiperSlide>
                            <button className='category-name mr-2 swiper-slide'>
                                Child
                            </button>
                        </SwiperSlide>
                    </Swiper>
                </div> */}
                <div className='product-banner mt-3'>
                    <img src={productBanner} alt='banner' />
                </div>
                <Suspense fallback="...loading">
                    <ProductsList
                        products={products}
                    />
                </Suspense>
            </main>
            {/* <footer className='product-page-footer product-footer'>
                <div className='footer-items'>
                   <span className='icon'><GoPerson/></span> <span className='navi-item'>GENDER</span>
                </div>
                <div className='footer-items'>
                    <span className='icon'><FaArrowUpLong/></span> <span className='navi-item'>SORT</span>
                </div>
                <div className='footer-items'>
                   <span className='icon'><LuFilter/></span><span className='navi-item'>FILTER</span>
                </div>
            </footer> */}
        </section>
    )
}

export default Products
