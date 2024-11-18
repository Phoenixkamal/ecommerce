import React from 'react'
import ots from '../OrderTracking.module.css'

const OrderTrackingList = ({ orderStatus , orders}) => {
    return (
        <ul className={ots.trackinglist}>
            <li className={`${ots.list} ${ots.lineChecked}`}>
                <div className={`${ots.roundCheckbox} ${ots.roundCheckboxChecked}`}>

                </div>
                <div className={ots.content}>
                    <div className={ots.contentHead}>
                        Order Confirm <span className={ots.date}>{orders.header.placedOn}</span>
                    </div>
                    <div className={ots.contentDescription}>
                        We have received your order
                    </div>
                </div>
            </li>
            {
                orderStatus.map((status, index) => (
                    <li className={`${ots.list} ${status.timeLine === "active" && ots.lineChecked}`} key={index}>
                        <div className={`${ots.roundCheckbox} ${status.timeLine === "active" && ots.roundCheckboxChecked}`}>

                        </div>
                        <div className={ots.content}>
                            <div className={ots.contentHead}>
                                {status.trackingName} <span className={ots.date}>{status.expectedOn}</span>
                            </div>
                            <div className={ots.contentDescription}>
                                {status.description}
                            </div>
                            <div className={ots.line}> </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default OrderTrackingList
