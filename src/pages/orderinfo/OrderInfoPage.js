import React, { useContext, useState } from 'react';
import styles from './OrderInfoPage.module.css';
import ReturnBack from '../../components/returnback/ReturnBack';
import { FaChevronLeft } from 'react-icons/fa6';
import OrderInfoBtns from '../../components/ordersinfo/OrderInfoBtns/OrderInfoBtns';
import OrderInfoList from '../../components/ordersinfo/OrderInfoList/OrderInfoList';
import { DataContext } from '../../contexts/Datacontext';
import { Route, Routes } from 'react-router-dom';
import OrderTracking from '../../components/OrderTracking/OrderTracking';

const OrderInfoPage = () => {
    const { ordersInfo } = useContext(DataContext)

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
                <OrderInfoBtns>
                    {
                        ordersInfo && 
                       <Routes>
                         <Route path='/' element={
                            <OrderInfoList
                                ordersInfo={ordersInfo}
                            />
                        }/>
                        <Route path='/ordertracking' element={<OrderTracking/>}/>
                       </Routes>
                    }
                </OrderInfoBtns>
            </main>
        </section>
    );
}

export default OrderInfoPage;

