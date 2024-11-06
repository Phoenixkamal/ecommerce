import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from '../pages/Authentication/registerpage/RegisterPage'
import LoginPage from '../pages/Authentication/loginpage/LoginPage'
import Otp from '../pages/Authentication/otp/Otp'
import PasswordChange from '../pages/Authentication/passwordchange/PasswordChange'
import ForgotPassword from '../pages/Authentication/forgotpassword/ForgotPassword'
import Dashboard from '../pages/dashboard/Dashboard'
import Category from '../pages/Products/Category/Category'
import Products from '../pages/Products/Products/Products'
import DashboardRoutes from './DashboardRoutes'

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path='/otp' element={<Otp />} />
                <Route path='/newpwd' element={<PasswordChange />} />
                <Route path="/dashboard/*" element={<DashboardRoutes/>} />
            </Routes>
        </>
    )
}

export default AppRoutes
