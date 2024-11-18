import React, { useContext, useState } from 'react'
import './Products.css'
// import productBanner from "../../../assets/images/product-banner-1.png"
import { DataContext } from '../../../contexts/Datacontext';
import SearchHeader from '../../../components/searchHeader/SearchHeader';
import ProductsList from '../../../components/products/productslist/ProductsList'

const Products = () => {
    const { products } = useContext(DataContext)
    const [search , setSearch] = useState("") 

    function filterProducts(){
        return products.filter((item)=>item.productName.toLowerCase().includes(search))
    }
    return (
        <section className='products-page'>
          <SearchHeader
            title={"Search Products"}
            viewType={true}
            search={search}
            setSearch={setSearch}
          />
            <main className='category-page-content'>
                {/* <div className='product-banner mt-3'>
                    <img src={productBanner} alt='banner' />
                </div> */}
                    <ProductsList
                        products={filterProducts()}
                        search = {search}
                    />
            </main>
        </section>
    )
}

export default Products
