import React from 'react'
import './OrderInfo.css'
import { Link } from 'react-router-dom'

const OrderInfo = ({order}) => {
    return (
        <Link  className='black-btn-wrap' to={`/dashboard/orderinfo/${order.sessionId}`}>
            <button className='black-btn'>Order Info</button>
        </Link>
    )
}

export default OrderInfo
