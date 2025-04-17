import React, { useEffect, useState } from 'react'
import './Products.css'
// import productBanner from "../../../assets/images/product-banner-1.png"
import SearchHeader from '../../../components/searchHeader/SearchHeader';
import ProductsList from '../../../components/products/productslist/ProductsList'
import { useParams } from 'react-router-dom';
import api from '../../../api/api';

const Products = () => {
    const {id} = useParams()
    
    
    const [search , setSearch] = useState("")
    function filterProducts(){
        // alert(search)
        return products.filter((item)=>item.productName.toLowerCase().includes(search.toLowerCase()))
    }

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getAllProducts() {
            try {
                const response = await api.get(`/user/products?categoryid=${id}`)
                if (response.data.status === "OK") {
                    setProducts(response.data.responsedata)
                }
                else {
                    console.log(response.data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }

        getAllProducts()
    }, [id])
    return (
        <section className='products-page'>
          <SearchHeader
            title={"Search Products"}
            viewType={true}
            search={search}
            setSearch={setSearch}
            viewbtn={true}
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
