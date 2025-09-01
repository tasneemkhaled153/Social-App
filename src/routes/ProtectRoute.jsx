import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({children}) {
    const {token} = useContext(UserContext);
    if(!token){
        return <Navigate to="/login"/>
    }
    else{
        return children
    }
}
