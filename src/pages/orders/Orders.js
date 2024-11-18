import React, { useContext, useEffect, useState } from 'react'
import OrdersList from '../../components/orders/orderslist/OrdersList'
import SearchHeader from '../../components/searchHeader/SearchHeader'
import api from '../../api/api'

const Orders = () => {
    const userData = JSON.parse(localStorage.getItem('userdata'))
    const [orders, setOrders] = useState([])
    useEffect(() => {
        async function getAllOrders() {
            if (userData.displayId && userData.displayId !== "") {
                try {
                    const response = await api.get(`/user/myorders?displayid=${userData.displayId}`)
                    if (response.data.status === "OK") {
                        console.log(response.data.responsedata.header)
                        setOrders(response.data.responsedata.header)
                    }
                    else {
                        console.log(response.data.message)
                    }
                }
                catch (err) {
                    console.log(err.message)
                }
            }
        }

        getAllOrders()
    }, [])
    return (
        <div className='orders'>
            <SearchHeader
                title={"Search Orders"}
            />
            <OrdersList
                orders={orders}
            />
        </div>
    )
}

export default Orders
