import React from 'react';
import ots from './OrderTracking.module.css';
import OrderTrackingList from './OrderTrackingList/OrderTrackingList';

const OrderTracking = ({ordersInfo}) => {
    console.log(ordersInfo)

    return (
        <div className={ots.orderTracking}>
            <h3>Track Order</h3>
            {
                ordersInfo && (
                    <OrderTrackingList
                        orderStatus={ordersInfo.status ? ordersInfo.status:[]}
                        orders={ordersInfo}
                    />
                )
            }
        </div>
    );
};

export default OrderTracking;
