import React from 'react'
import './Products.css'
import cardImg from '../../../assets/images/product-card-img-1.png'
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";
import productBanner from "../../../assets/images/product-banner-1.png"
import { FaStar } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoPerson } from "react-icons/go";
import { FaArrowUpLong } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";

const Products = () => {
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
                <div className='product-category category-list swiper-container'>
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
                </div>
                <div className='product-banner mt-3'>
                    <img src={productBanner} alt='banner' />
                </div>
                <div className='products-list row'>
                    <div className='card-wrapper col-6'>
                        <div className='product-card '>
                            <div className='card-img'>
                                <img src={cardImg} alt="product-image" />
                                <div className='whistlist'>
                                    <FaRegHeart />
                                </div>
                            </div>
                            <div className='product-card-body'>
                                <button className='card-btn'>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                        <div className='card-content'>
                            <div className='card-content-head'>
                                <h6>
                                    bluebell hand block tiered dress
                                </h6>
                            </div>
                            <div className='product-description'>
                                <p className='price'>$80
                                </p>
                                <del className='price-striked text-muted'>$95</del>
                                <div className='ratings'>
                                    <div className='star-icon'>
                                        <FaStar />
                                    </div>
                                    <div className='review text-muted'>
                                        (2k Review)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
