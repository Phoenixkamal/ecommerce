import React, { useEffect, useState } from 'react'
import EditProductList from './EditProductList'
import { useParams } from 'react-router-dom'
import api from '../../../api/api'
import SearchHeader from '../../searchHeader/SearchHeader'

const EditProductWrap = () => {

    const [search, setSearch] = useState("")

    const { id } = useParams()

    function filterProducts() {
        return products.filter((item) => item.productName.toLowerCase().includes(search.toLowerCase()))
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
        <div className='products-page'>
            <SearchHeader
                title={"Search Products"}
                viewType={true}
                search={search}
                setSearch={setSearch}
                viewbtn={false}
            />
            {
              products &&
              filterProducts().map((product , index)=>(
                <EditProductList
                    key={index}
                    product={product}
                    btnAddon={index}
                />
            ))
            }
        </div>
    )
}

export default EditProductWrap
