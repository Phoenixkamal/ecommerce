import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import EditCategoryList from '../../components/products/EditCategoryList/EditCategoryList'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'

const WarehouseInventory = () => {
    const [warehouseInventory, setWarehouseInventory] = useState([])
    const { warehouseid } = useParams()
    useEffect(() => {
        async function getWarehouse() {
            try {
                const response = await api.get(`Admin/GetCategoryByWarehouse?warehouseid=${warehouseid}`)
                console.log(response.data.responsedata)
                setWarehouseInventory(response.data.responsedata)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getWarehouse()
    }, [warehouseid])
    return (
        <div style={{margin:'70px 0px 70px 0px'}}>
            <SecondaryHeader
                title={"Categories"}
            />
            {
                warehouseInventory ?  
                warehouseInventory.map((category,index) => (
                    <EditCategoryList
                        category={category}
                        key={index}
                        editbtn={false}
                    />
                ))
                : (
                    <div className='cart-is-empty'>Inventory Is Empty</div>
                  )
            }
        </div>
    )
}

export default WarehouseInventory
