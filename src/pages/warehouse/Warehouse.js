import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import './Warehouse.css'
import { Link } from 'react-router-dom'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'
const Warehouse = () => {
    const [warehouse,setWarehouse] = useState([])
    useEffect(() => {
        async function getWarehouse() {
            try {
                const response = await api.get('admin/Warehouse')
                console.log(response.data.responsedata)
                setWarehouse(response.data.responsedata)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getWarehouse()
    }, [])
    return (
        <div style={{margin:'70px 0px 70px 0px'}}>
            <SecondaryHeader
                title={"Warehouse"}
            />
            {
                warehouse.map((item,index)=>(
                    <div className='order warehouselist' key={index}>
                        <div>
                        {item.warehouseName}
                        </div>
                        <div>
                        {item.city}
                        </div>
                        <div className='warehouse-view'>
                            <Link to={`${item.recordId}`} className='black-btn'>View</Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Warehouse
