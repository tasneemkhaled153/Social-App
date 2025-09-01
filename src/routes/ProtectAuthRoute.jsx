import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function ProtectAuthRoute({children}) {
    const {token} = useContext(UserContext);
    if(token){
        return <Navigate to="/"/>
    }
    else{
        return children
    }
 
}
