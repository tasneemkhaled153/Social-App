import React, { useContext, useEffect, useState } from 'react'
import PostItem from './PostItem'
import axios from 'axios';
import {  useQuery } from '@tanstack/react-query';
import { Spinner } from 'flowbite-react';
import Loader from '../Loader/Loader';
import { UserContext } from '../../context/UserContext';


export default function PostsList({isProfile}) {
    let{userData}= useContext(UserContext);
    // console.log(import.meta.env.VITE_BASE_URL);
    
   
    let{data,isLoading }=useQuery({
        queryKey:isProfile?["user",userData?._id]:["posts"],
        queryFn:getPosts,
        select:data=>data.data
    })
    async function getPosts(){
      let apiUrl = isProfile ? `${import.meta.env.VITE_BASE_URL}users/${userData?._id}/posts` : `${import.meta.env.VITE_BASE_URL}posts?limit=10&sort=-createdAt`
           return await axios.get(apiUrl,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
           
    }
    
    useEffect(() => {
        getPosts();
    }, []);

    if(isLoading){
        return <Loader/>

    }
    return (<>
        <div className='flex flex-col gap-4'>
            {
                data?.posts?.map(post=>(
                    <PostItem key={post._id} post={post} isHome={isProfile}/>
                ))
            }
        </div>

    </>

    )
}
