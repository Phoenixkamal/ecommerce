import React from 'react'
import styles from './OrderInfoBtns.module.css'
import { Link, useLocation } from 'react-router-dom'

const OrderInfoBtns = ({ children ,btnStyle,id }) => {
    const location = useLocation()
    let activeItemsBtn = location.pathname === `/dashboard/orderinfo/${id}/` || location.pathname===`/dashboard/orderinfo/${id}`
    return (
        <div className={styles.contentWrap}>
            <div className={styles.btns}>
                <Link to={`/dashboard/orderinfo/${id}/`} className={`${styles.switchBtns} ${activeItemsBtn && styles.orderActive}`} style={btnStyle}>
                    Items
                </Link>
                <Link to={`/dashboard/orderinfo/${id}/ordertracking`} className={`${styles.switchBtns} ${location.pathname === `/dashboard/orderinfo/${id}/ordertracking` && styles.orderActive} `} style={btnStyle}>
                    Trackorder
                </Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default OrderInfoBtns
