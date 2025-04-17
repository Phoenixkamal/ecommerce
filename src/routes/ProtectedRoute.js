import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children,roles}) => {
  const [isAuthenticated,setIsAuthenticated] = useState(true)
  const userData  = JSON.parse(localStorage.getItem('userdata'))


  useEffect(() => {
    if (roles.includes(userData.role)) {
      setIsAuthenticated(true);
    } else {
      console.log("User not authorized");
      setIsAuthenticated(false);
    }
  }, [userData.role, roles]);
  return (
    <>
      {isAuthenticated ? children : <Navigate to='/dashboard/notfound'/>}
    </>
  )
}

export default ProtectedRoute
