import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import PostItem from '../../components/posts/PostItem';
import { Spinner } from 'flowbite-react';
import Loader from '../../components/Loader/Loader';

export default function PostDetails() {
    let{id:post_id}=useParams();
    console.log(post_id);
    let {data,isLoading}= useQuery({
        queryKey:["post",post_id],
        queryFn:getPost,
        select:data=>data.data,
        onSuccess:data=>console.log(data),
        onError:error=>console.log(error)
    })

    async function getPost() {
        return await axios.get(`${import.meta.env.VITE_BASE_URL}posts/${post_id}`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
    }
    if(isLoading){

        return <section className='max-w-xl mx-auto py-12'>
      <div className='flex flex-col gap-4'>
        <Loader/>
      </div>
    </section>
    }
  return (
    <section className='max-w-xl mx-auto py-12'>
      <div className='flex flex-col gap-4'>
    <PostItem post={data?.post} isHome={false}/>
      </div>
    </section>
  )
}
