import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export default function UserContextProvider({children}){
    let[token,setToken]=useState(null);
    let [userData,setUserData]=useState(null);
    useEffect(()=>{
        let token = localStorage.getItem("token");
        if(token){
            setToken(token);
            getUserData(token);
        }
    },[])

    useEffect(()=>{
        if(token){
            getUserData(token);
        }
    },[token])
    async function getUserData(token){
        try{

            let {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}users/profile-data`,{
                headers:{
                    token:token
                }
            })
            console.log(data);
            setUserData(data.user);
        }catch(error){
            console.log(error);
        }
    }
    return(
        <UserContext.Provider value={{token,setToken,userData,setUserData,getUserData}}>
            {children}
        </UserContext.Provider>
    )

}
