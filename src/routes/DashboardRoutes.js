import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Category from '../pages/Products/Category/Category'
import Dashboard from '../pages/dashboard/Dashboard'
import Products from '../pages/Products/Products/Products'

const DashboardRoutes = () => {
    return (
        <Dashboard>
            <Routes>
                <Route path="/" element={<Category />} />
                <Route path='/products' element={<Products />} />
            </Routes>
        </Dashboard>
    )
}

export default DashboardRoutes
