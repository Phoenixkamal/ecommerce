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
import EditProfile from '../pages/editprofile/EditProfile'
import SavedAddress from '../pages/savedaddress/SavedAddress'
import Notification from '../pages/notification/Notification'
import ProtectedRoute from './ProtectedRoute'
import Notfound from '../components/Notfound/Notfound'
import EditCategory from '../pages/Products/EditCategory/EditCategory'
import EditInsight from '../components/products/EditCategoryList/EditInsight/EditInsight'
import EditProductWrap from '../components/products/EditproductList/EditProductWrap'
import EditProductInsight from '../components/products/EditproductList/EditProductInsight'
import EditUsersList from '../pages/EditUsers/EditUsersList'
import EditUsers from '../pages/EditUsers/EditUsers'
import AddUser from '../pages/EditUsers/AddUser'
import EditUserCategory from '../pages/EditUsers/EditUserCategory'
import Warehouse from '../pages/warehouse/Warehouse'
import WarehouseInventory from '../pages/warehouse/WarehouseInventory'
import WarehouseProducts from '../pages/warehouse/WarehouseProducts'
import Wishlist from '../pages/wishlist/Wishlist'

const DashboardRoutes = () => {
    return (
        <Dashboard>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute
                            roles={["Admin", "Buyer", "Warehouse Admin", "Delivery Agent"]}
                        >
                            <Routes>
                                <Route path="/" element={<Category />} />
                                <Route path="/products/:id" element={<Products />} />
                                <Route path="/products/:id/:id" element={<ProductInsight />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/orderinfo/:id/*" element={<OrderInfoPage />} />
                                <Route path="/userprofile" element={<UserProfile />} />
                                <Route path="/addaddress" element={<AddAddress />} />
                                <Route
                                    path="/editaddress/:recordid"
                                    element={<EditAddress />}
                                />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route
                                    path="/productskeleton"
                                    element={<ProductSkeleton />}
                                />
                                <Route path="/editprofile" element={<EditProfile />} />
                                <Route path="/notification" element={<Notification />} />
                                <Route path="/savedaddress" element={<SavedAddress />} />
                                <Route path="/category" element={<Category />} />
                                <Route
                                    path="/category/products/:id"
                                    element={<Products />}
                                />
                                <Route
                                    path="/category/products/:id/:id"
                                    element={<ProductInsight />}
                                />
                                <Route
                                    path="/wishlist"
                                    element={<Wishlist />}
                                />
                                <Route
                                    path="/wishlist/:id"
                                    element={<ProductInsight />}
                                />
                            </Routes>
                        </ProtectedRoute>
                    }
                />
                <Route path="editcategorylist">
                    <Route index element={
                        <ProtectedRoute roles={["Admin"]}>
                            <EditCategory />
                        </ProtectedRoute>
                    }/>
                    <Route path=':id' element={<EditInsight />}/>
                    <Route path="editproductlist/:id">
                        <Route index element={  <EditProductWrap />}/>
                        <Route path=':id' element={ <EditProductInsight />}/>
                    </Route>
                </Route>
                <Route path='edituserslist'>
                    <Route index element={
                        <ProtectedRoute roles={["Admin"]}>
                            <EditUserCategory />
                        </ProtectedRoute>
                    } ></Route>
                    <Route path='adduser/:id' element={<AddUser />} />
                    <Route path=':id'>
                        <Route index element={<EditUsersList />}></Route>
                        <Route path=':id' element={<EditUsers />} />
                    </Route>
                </Route>
                <Route path='warehouselist'>
                    <Route index element={<ProtectedRoute roles={["Admin"]}>
                        <Warehouse />
                    </ProtectedRoute>}>
                    </Route>
                    <Route path=':warehouseid'>
                        <Route index element={<WarehouseInventory />} />
                        <Route path='editcategorylist/:id' element={<EditInsight />} />
                        <Route path=':categoryid' >
                            <Route index element={<WarehouseProducts />} />
                            <Route path=':id' element={<EditProductInsight />} />
                        </Route>
                    </Route>
                </Route>
                <Route path='/notfound' element={<Notfound />} />
            </Routes>
        </Dashboard>
    )
}

export default DashboardRoutes
