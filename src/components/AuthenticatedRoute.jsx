import React, { useEffect } from 'react'
import { useAuth } from './auth'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const AuthenticatedRoute = ({children}) => {

    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if(!auth.user){
        return <Navigate to={'/login'} />
    }
    return children
}

export default AuthenticatedRoute