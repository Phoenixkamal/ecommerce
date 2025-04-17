import React from 'react'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'
import image from '../../assets/images/product-card-img-1.png'
import './Notification.css'

const Notification = () => {
  return (
    <div className='notifications'>
      <SecondaryHeader
        title={"Notifications"}
      />
      <main className='notifications-content'>
        <div className='notification-entity'>
          <div className='notification-image'>
            <img src={image} alt='notification'></img>
          </div>
          <div className='notification-description'>
            <div className='notification-head'> 
              <p>
              New Arrivals Alert!</p>
            </div>
            <div className='notification-date'>
              <p>15 July 2023</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Notification
