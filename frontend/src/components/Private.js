import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function Private() {
    const authToken=sessionStorage.getItem("token")
    return authToken? <Outlet/>: <Navigate to="/admin-login"/>
   
}

export default Private