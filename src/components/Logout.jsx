import React, { useEffect } from 'react'
import { useAuth } from './auth'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    
    const navigate = useNavigate();
    const auth = useAuth();
    
    useEffect(() => {
        auth.logout();
        navigate('/login')
    })
}

export default Logout