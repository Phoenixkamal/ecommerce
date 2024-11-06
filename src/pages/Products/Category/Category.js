import React, { useEffect, useState } from 'react'
import './Category.css'
import { FaRegHeart } from "react-icons/fa";
import categoryImg from '../../../assets/images/product-category-1.png'
import cardImg from '../../../assets/images/product-card-img-1.png'
import api  from '../../../api/api'
import ProductsList from '../../../components/productslist/ProductsList';
// import { IoSearch } from "react-icons/io5";
// import { LuHome } from "react-icons/lu";
// import { IoCartOutline } from "react-icons/io5";
// import { IoIosPaper } from "react-icons/io";
// import { IoPersonOutline } from "react-icons/io5";



const Category = () => {

    const [categories,setCategories] = useState([])
    
    useEffect(()=>{
        async function getAllCategory(){
            try{
                const response = await api.get('/User/Category')
                if(response.data.status==="OK"){
                    setCategories(response.data.responsedata)
                }
                else{
                    console.log(response.data.message)
                }
            }
            catch(err){
                console.log(err.message)
            }
        }
        getAllCategory()
    },[])
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
                <ProductsList
                    categories={categories}
                />
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
