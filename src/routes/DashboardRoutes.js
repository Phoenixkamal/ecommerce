import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Category from '../pages/Products/Category/Category'
import Products from '../pages/Products/Products/Products'
import Cart from '../pages/cart/Cart'
import Dashboard from '../pages/dashboard/Dashboard'
import OrderInfoPage from '../pages/orderinfo/OrderInfoPage'
import Orders from '../pages/orders/Orders'
import UserProfile from '../pages/userprofile/UserProfile'
import AddAddress from '../pages/savedaddress/AddAddress/AddAddress'
import EditAddress from '../pages/savedaddress/editAddress/EditAddress'
import Checkout from '../pages/cart/checkout/Checkout'
import ProductInsight from '../pages/Products/productinsight/ProductInsight'
import ProductSkeleton from '../components/products/product/productskeleton/ProductSkeleton'

const DashboardRoutes = () => {
    return (
        <Dashboard>
            <Routes>
                <Route path="/" element={<Category />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:id' element={<ProductInsight/>} />
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/orderinfo/*' element={<OrderInfoPage/>}/>
                <Route path='/userprofile' element={<UserProfile/>}/>
                <Route path='/addaddress' element={<AddAddress/>}/>
                <Route path='/editaddress/:recordid' element={<EditAddress/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/productskeleton' element={<ProductSkeleton/>} />
            </Routes>
        </Dashboard>
    )
}

export default DashboardRoutes
