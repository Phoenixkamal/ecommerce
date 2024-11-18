import React from 'react'
import './Order.css'
import OrderInfo from '../../ordersinfo/orderInfo/OrderInfo'

const Order = ({ order }) => {
    return (
        <div className='order'>
            <div className='order-head'>
                <div className='order-id'>
                    <h6>Order# :</h6><div className='id'>{order.orderNo}</div>
                </div>
                <div className='price'>
                    {'\u20B9' + order.total}
                </div>
                <div className='status'>
                    {order.status}
                </div>
            </div>
            <div className='content-head'>
                <p>Delivery To</p>
            </div>
            <div className='order-info'>
                <ul className='customer-info'>
                    <li className='info'>{order.name},</li>
                    <li className='info'>{order.address1},</li>
                    <li className='info'>{order.city}-{order.zipcode}</li>
                </ul>
                <div className='wrapper'>
                    <OrderInfo
                        order={order}
                    />
                </div>
            </div>
        </div>
    )
}

export default Order
