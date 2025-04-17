import React from 'react'
import Order from '../order/Order'
import './OrderList.css'

const OrdersList = ({orders}) => {
  return (
    <div className='order-list'>
        {/* <div className='head'>My Orders</div> */}
        {
            orders.map((order,index)=>(
                <Order
                    key={index}
                    order={order}
                />
            ))
        }
    </div>
  )
}

export default OrdersList
