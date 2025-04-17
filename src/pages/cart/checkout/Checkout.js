import React, { useContext, useEffect } from 'react'
import SecondaryHeader from '../../../components/secondaryheader/SecondaryHeader'
import OrderInfoList from '../../../components/ordersinfo/OrderInfoList/OrderInfoList'
import { DataContext } from '../../../contexts/Datacontext'
import './Checkout.css'
import api from '../../../api/api'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { checkOutItem,setCartCount } = useContext(DataContext)
  const UserData = JSON.parse(localStorage.getItem('userdata'))
  let navigate = useNavigate()

  useEffect(() => {
    console.log(checkOutItem)
  }, [checkOutItem])

  async function handleClick() {
    try {
      const response = await api.get(`/user/orderdetails?displayId=${UserData.cartDisplayId}&status=placeorder&addressid=${UserData.defaultAddressId}`)
      console.log(response)
      setCartCount(0)
      navigate('/dashboard/orderinfo/')
    }
    catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <SecondaryHeader
        title={"Checkout"}
      />
      <div className='checkout-content-wrap'>
        {
          checkOutItem &&
          <div>
            <OrderInfoList
              ordersInfo={checkOutItem}
            />
            <button className='update-profile-btn save-address place-order' onClick={handleClick}>
              Place Order
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Checkout
