import React from 'react'
import styles from './OrderInfoBtns.module.css'
import { Link, useLocation } from 'react-router-dom'

const OrderInfoBtns = ({ children ,btnStyle }) => {
    const location = useLocation()
    let activeItemsBtn = location.pathname === '/dashboard/orderinfo/' || location.pathname==='/dashboard/orderinfo'
    return (
        <div className={styles.contentWrap}>
            <div className={styles.btns}>
                <Link to="/dashboard/orderinfo/" className={`${styles.switchBtns} ${activeItemsBtn && styles.orderActive}`} style={btnStyle}>
                    Items
                </Link>
                <Link to="/dashboard/orderinfo/ordertracking" className={`${styles.switchBtns} ${location.pathname === '/dashboard/orderinfo/ordertracking' && styles.orderActive} `} style={btnStyle}>
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
