import React, { useEffect, useState } from 'react';
import styles from './OrderInfoPage.module.css';
import ReturnBack from '../../components/returnback/ReturnBack';
import { FaChevronLeft } from 'react-icons/fa6';
import OrderInfoBtns from '../../components/ordersinfo/OrderInfoBtns/OrderInfoBtns';
import OrderInfoList from '../../components/ordersinfo/OrderInfoList/OrderInfoList';
import { Route, Routes, useParams } from 'react-router-dom';
import OrderTracking from '../../components/OrderTracking/OrderTracking';
import api from '../../api/api';

const OrderInfoPage = () => {
    const [ordersInfo , setOrdersInfo] =  useState(null)
    const {id} = useParams()

    useEffect(() => {
        async function getOrdersInfo() {
            try {
                const response = await api.get(`/user/orderdetails?displayid=${id}`)
                if (response.data.status === "OK") {
                    console.log(response.data.responsedata)
                    setOrdersInfo(response.data.responsedata)
                }
                else {
                    console.log(response.data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getOrdersInfo()
    }, [id])

    return (
        <section className={styles.orderInfoPage}>
            <header className={styles.productHeader}>
                <ReturnBack>
                    <FaChevronLeft />
                </ReturnBack>
                <div className={styles.orderInfoHead}>
                    <h5>My Order</h5>
                </div>
            </header>
            <main className={styles.orderInfoPageContent}>
                <OrderInfoBtns
                    id = {id}
                >
                    {
                        ordersInfo && 
                       <Routes>
                         <Route path='/' element={
                            <OrderInfoList
                                ordersInfo={ordersInfo}
                            />
                        }/>
                        <Route path='/ordertracking' element={
                            <OrderTracking
                                ordersInfo={ordersInfo}
                            />
                        }/>
                       </Routes>
                    }
                </OrderInfoBtns>
            </main>
        </section>
    );
}

export default OrderInfoPage;

