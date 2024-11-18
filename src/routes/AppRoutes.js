import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from '../pages/Authentication/registerpage/RegisterPage'
import LoginPage from '../pages/Authentication/loginpage/LoginPage'
import Otp from '../pages/Authentication/otp/Otp'
import PasswordChange from '../pages/Authentication/passwordchange/PasswordChange'
import ForgotPassword from '../pages/Authentication/forgotpassword/ForgotPassword'
import DashboardRoutes from './DashboardRoutes'
import ProtectedRoute from './ProtectedRoute'
import EditProfile from '../pages/editprofile/EditProfile'
import SavedAddress from '../pages/savedaddress/SavedAddress'
import Notification from '../pages/notification/Notification'

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path='/otp' element={<Otp />} />
                <Route path='/newpwd' element={<PasswordChange />} />
                <Route path="/dashboard/*" element={
                    <ProtectedRoute>
                        <DashboardRoutes />
                    </ProtectedRoute>
                } />
                <Route path='/editprofile' element={<EditProfile />} />
                <Route path='/notification' element={<Notification />} />
                <Route path='/savedaddress' element={<SavedAddress />} />
            </Routes>
        </>
    )
}

export default AppRoutes
