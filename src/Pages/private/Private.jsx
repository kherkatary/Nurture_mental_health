import React from 'react'
import { useAuth } from '../../Context/context';
import { Navigate, useLocation } from 'react-router-dom';

const Private = ({children}) => {
    const {isAuthenticated}= useAuth()
    const location = useLocation();

    if(!isAuthenticated) return <Navigate to="/login"  state={{ from: location }} />

  return (
    children
  )
}

export default Private