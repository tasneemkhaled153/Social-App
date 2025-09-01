import React from 'react'

import Add from './../../components/posts/Add';
import PostsList from '../../components/posts/PostsList';
export default function Posts() {
  
  return (
    <>
    <section className='max-w-xl mx-auto py-12'>
      <div className='flex flex-col gap-4'>
        {/* Post Form */}
    <Add/>
    {/* Posts List */}
    <PostsList isProfile={false}/>
      </div>
       
    </section>
   
    </>
  )
}
