import React, { useContext, useEffect, useState } from 'react'
import api from '../../api/api'
import './Cart.css'
import CartListView from '../../components/cart/CartListView'
import { DataContext } from '../../contexts/Datacontext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {setCheckOutItem , setCartLength} = useContext(DataContext)
  const userData = JSON.parse(localStorage.getItem('userdata'))
  const [cartItems, setCartItem] = useState([])
  const [subtotal, setSubTotal] = useState(0)
  const [filterId, setFilterId] = useState(0) 
  const [counterRefresh, setCounterRefresh] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function getCartItems() {
      if (userData.cartDisplayId) {
        try {
          const response = await api.get(`/User/CartDetails?displayid=${userData.cartDisplayId}`)
          if (response.data.status === "OK") {
            setCartItem(response.data.responsedata.lines)
            setCartLength(response.data.responsedata.lines.length)
            setSubTotal(response.data.responsedata.header.subTotal)
            setCheckOutItem(response.data.responsedata)
          }
          else {
            console.log(response.data.message)
          }
        }
        catch (err) {
          console.log(err.message)
        }
      }
    }
    getCartItems()
  }, [counterRefresh])

  useEffect(() => {
    setCartItem(cartItems.filter((item) => item.recordId !== filterId)) 
  }, [filterId])

  function handleClick(){
    navigate('/dashboard/checkout')
  }

  return (
    <div>
      <header className='product-header header'>
        <div className='cart-title'>
          <h5>My Cart</h5>
        </div>
      </header>
      {
        cartItems.length ? (
          <div className='cart-contents'>
            <div className='subtotal'>
              <p className='subtotal-head'>Subtotal</p><p className='subtotal-price'>₹{subtotal}.00</p>
            </div>
            <div className='products-list cart-list'>
              {
                cartItems.map((product, index) => (
                  <CartListView
                    key={index}
                    product={product}
                    setFilterId={setFilterId}
                    setCounterRefresh={setCounterRefresh}
                    counterRefresh={counterRefresh}
                  />
                ))
              }
            </div>
            <button className='update-profile-btn save-address place-order' onClick={handleClick}>
              Proceed To Buy
            </button>
          </div>
        )
          : (
            <div className='cart-is-empty'>Your Cart Is Empty</div>
          )
      }
    </div>
  )
}

export default Cart
