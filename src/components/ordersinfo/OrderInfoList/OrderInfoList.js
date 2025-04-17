import React from 'react'
import styles from './OrderInfoList.module.css'
import { FaAngleRight } from 'react-icons/fa6';
import { GrLocation } from "react-icons/gr";
import { IoCardOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const OrderInfoList = ({ ordersInfo }) => {
    return (
        <div>
            <div className={styles.methods}>
                <Link  to="/dashboard/savedaddress" className={styles.methodsWrap}>
                    <div className={styles.icon}>
                        <GrLocation />
                    </div>
                    <div className={styles.userDetail}>
                        <div className='content-head'>
                            <p>Delivery Address</p>
                        </div>
                        <div className={styles.orderInfo}>
                            <p>
                                {ordersInfo.address.address1},<br></br>
                                {ordersInfo.address.city + - +ordersInfo.address.zipcode}
                            </p>
                        </div>
                    </div>
                    <div className={styles.goNextBtn}>
                        <FaAngleRight />
                    </div>
                </Link>
                <div className={styles.methodsWrap}>
                    <div className={styles.icon}>
                        <IoCardOutline />
                    </div>
                    <div className={styles.userDetail}>
                        <div className='content-head'>
                            <p>Payment</p>
                        </div>
                        <div className={styles.orderInfo}>
                            <p>
                                Cash On Delivery
                            </p>
                        </div>
                    </div>
                    <div className={styles.goNextBtn}>
                        <FaAngleRight />
                    </div>
                </div>
            </div>
            <div className={styles.billingWrap}>
                <ul className={styles.list}>
                    {
                        ordersInfo.lines.map((line,index) => (
                            <li className={styles.billingItemlist} key={index}>
                                <div className={styles.itemName}>
                                   {line.productName}
                                </div>
                                <div className={styles.itemQty}>
                                    {line.qty}X
                                </div>
                                <div className={styles.itemPrice}>
                                ₹{line.price}.00
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <ul className={styles.list}>
                    <li className={styles.billing}>
                        <div className={styles.billingProcess}>

                            Item Subtotal
                        </div>
                        <div className={styles.billingPrice}>
                        ₹{ordersInfo.header.subTotal}.00
                        </div>
                    </li>
                    <li className={styles.billing}>
                        <div className={styles.billingProcess}>
                            Discount
                        </div>
                        <div className={styles.billingPrice}>
                        ₹{ordersInfo.header.discount}.00
                        </div>
                    </li>
                    <li className={styles.billing}>
                        <div className={styles.billingProcess}>

                            Tax
                        </div>
                        <div className={styles.billingPrice}>
                        ₹{ordersInfo.header.taxAmount}.00
                        </div>
                    </li>
                    <li className={styles.billing}>
                        <div className={styles.billingProcess}>
                            Shipping
                        </div>
                        <div className={styles.shipping}>
                            Free Delivery
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.total}>
                <div className={styles.head}>
                    <h4>Order Total</h4>
                </div>
                <div className={styles.totalPrice}>
                    <h4>₹{ordersInfo.header.total}</h4>
                </div>
            </div>
        </div>
    )
}

export default OrderInfoList
