import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import EditProductList from '../../components/products/EditproductList/EditProductList'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'

const WarehouseProducts = () => {
    const [warehouseProducts, setWarehouseProducts] = useState([])
    const { warehouseid, categoryid } = useParams()

    useEffect(() => {
        async function getWarehouseProducts() {
            try {
                const response = await api.get(`Admin/GetProductsByCridWrid?categoryrid=${categoryid}&warhouserid=${warehouseid}`)
                setWarehouseProducts(response.data.responsedata)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getWarehouseProducts()
    }, [categoryid,warehouseid])
    return (
        <div style={{margin:'70px 0px 70px 0px'}}>
        <SecondaryHeader
            title={"Products"}
        />
        <ul className='edit-category-list'>
            {
                warehouseProducts?
                warehouseProducts.map((product, index) => (
                    <EditProductList
                    key={index}
                    product={product}
                    btnEdit={true}
                />
                ))
                :
                (
                    <div className='cart-is-empty'>Products Is Empty</div>
                  )
            }
        </ul>
        </div>
    )
}

export default WarehouseProducts
