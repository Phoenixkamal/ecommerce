import React, { useContext } from 'react';
import ots from './OrderTracking.module.css';
import { DataContext } from '../../contexts/Datacontext';
import OrderTrackingList from './OrderTrackingList/OrderTrackingList';

const OrderTracking = () => {
    const { ordersInfo } = useContext(DataContext)

    const contenthead = [
        "Order Confirm",
        "Ready To Ship",
        "Order Shipped",
        "Order Delivered"
    ]

    return (
        <div className={ots.orderTracking}>
            <h3>Track Order</h3>
            {
                ordersInfo && (
                    <OrderTrackingList
                        orderStatus={ordersInfo.status}
                        orders={ordersInfo}
                    />
                )
            }
        </div>
    );
};

export default OrderTracking;
