import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RegisterPage from '../pages/Authentication/registerpage/RegisterPage'
import LoginPage from '../pages/Authentication/loginpage/LoginPage'
import Otp from '../pages/Authentication/otp/Otp'
import PasswordChange from '../pages/Authentication/passwordchange/PasswordChange'
import ForgotPassword from '../pages/Authentication/forgotpassword/ForgotPassword'
import DashboardRoutes from './DashboardRoutes'
import ProtectedRoute from './ProtectedRoute'
import { DataContext } from '../contexts/Datacontext'

const AppRoutes = () => {
    const {isAuthenticated} = useContext(DataContext) 
    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to="/login"/>}/>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path='/otp' element={<Otp />} />
                <Route path='/newpwd' element={<PasswordChange />} />
                <Route path="/dashboard/*" element={ <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                >
                    <DashboardRoutes/>
                </ProtectedRoute>} />
               
            </Routes>
        </>
    )
}

export default AppRoutes
