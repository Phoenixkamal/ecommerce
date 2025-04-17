import React, {  useEffect, useState } from 'react'
import OrdersList from '../../components/orders/orderslist/OrdersList'
import api from '../../api/api'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'

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
    }, [userData.displayId])
    return (
        <div className='orders'>
            {/* <SearchHeader
                title={"Search Orders"}
            /> */}
                <SecondaryHeader
        title={"Orders"}
      />
            <OrdersList
                orders={orders}
            />
        </div>
    )
}

export default Orders
