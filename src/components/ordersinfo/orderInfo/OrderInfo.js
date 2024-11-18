import React, { useContext } from 'react'
import './OrderInfo.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../../../contexts/Datacontext'

const OrderInfo = ({order}) => {
    const {setOrdersInfoId} = useContext(DataContext)
    function handleClick(){
        setOrdersInfoId(order.sessionId)
    }
    return (
        <Link  className='black-btn-wrap' to="/dashboard/orderinfo" onClick={handleClick}>
            <button className='black-btn'>Order Info</button>
        </Link>
    )
}

export default OrderInfo
