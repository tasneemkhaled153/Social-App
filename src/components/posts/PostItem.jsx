import React, { useState } from 'react'
import { Avatar, Button, Card, Dropdown, DropdownItem, Label, Spinner, Textarea } from "flowbite-react";
import Comment from '../comemnts/Comment';
import { FaComment, FaHeart, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddComment from '../comemnts/AddComment';
import { useForm } from 'react-hook-form';
import ValidationError from '../shared/ValidationError/ValidationError';
import DropDownMenu from '../shared/DropDownMenu/DropDownMenu';
import { IoMdCloudUpload } from 'react-icons/io';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export default function PostItem({post ,isHome}) {
    let{_id:post_id ,body,comments,createdAt,image:postImage,user:{name:userName ,_id:user_id ,photo:userImage}}=post
    let [isEdit,setIsEdit]=useState(false)
    let{register,handleSubmit, formState:{errors,isSubmitting,isValid}}=useForm({})
    let {userData}= useContext(UserContext);
    let queryClient = useQueryClient();

    // update post
    
   let{mutate:handleEditPost}= useMutation({
        mutationFn:editPost,
        onSuccess:()=>{
            toast.success("Post edited successfully");
            setIsEdit(false);
            queryClient.invalidateQueries({
                queryKey:["posts"]
            })
            queryClient.invalidateQueries({
                queryKey:["user",userData?._id]
            })
        },
        onError:()=>{
            toast.error("Post edited failed");
        }
    })    
    async function editPost(values){
        let formData = new FormData();
        console.log(values);
        formData.append("body",values.body);
        if(values.image[0]){
        formData.append("image",values.image[0]);
        }
    return await axios.put(`${import.meta.env.VITE_BASE_URL}posts/${post_id}`,formData,{
    headers:{
        token:localStorage.getItem("token")
    }
    })
 
      }
      
    //   delete Post
    async function deletePost(){
        return axios.delete(`${import.meta.env.VITE_BASE_URL}posts/${post_id}`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })

    }
    let{mutate:handleDeletePost}= useMutation({
        mutationFn:deletePost,
        onSuccess:()=>{
            toast.success("Post deleted successfully");
            queryClient.invalidateQueries({
                queryKey:["posts"]
            })
            queryClient.invalidateQueries({
                queryKey:["user",userData?._id]
            })
        },
        onError:()=>{
            toast.error("Post deleted failed");
        }
    })
  return (
    <>
    <Card>
        {/* header */}
        <header >
            <div className='flex items-center justify-between'>
               <div className='flex items-center gap-2'>
                <Avatar alt="User settings" img={userImage} rounded />
                <div>
                    <h2 className='text-lg m-0'>{userName}</h2>
                    <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
            
            </div> 
            {user_id==userData._id &&
            <DropDownMenu onEdit={()=>{setIsEdit(true)}} onDelete={handleDeletePost}/>}
            </div>
            
        </header>
      {/* body */}
      {
        isEdit ?
        <form onSubmit={handleSubmit(handleEditPost)} className="flex flex-col gap-4">
              <div className="mb-2 block">
                <Label htmlFor="comment">Edit Post</Label>
              </div>
              <div className='flex items-center gap-2'>
              <Textarea id="comment" defaultValue={body}  rows={2} {...register("body",{required:"Post body is required"})}/>
              
              <label htmlFor="file">
              <IoMdCloudUpload className='text-4xl cursor-pointer' />
              </label>
              <input type="file" id="file" hidden {...register("image")}/>
              </div>
              <ValidationError error={errors.body}/>
                <Button disabled={!isValid || isSubmitting} type="submit">{
                  isSubmitting && <Spinner aria-label="Spinner button example" size="sm" light />
                }<span className='pl-3'>Submit</span></Button>
              </form>
        :
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {body}
        </h3>
      }
      <img src={postImage} alt={postImage} />
      {/* footer */}
      <div className='flex items-center justify-between border-b-1 border-gray-200 p-2' >
      <FaHeart />
      <div className='flex items-center gap-2'>
        <span>{comments?.length}</span>
      <FaComment />
      </div>
      <Link to={`/post-details/${post_id}`}>
      <FaShare />
      </Link>
      </div>
      <AddComment post_id={post_id}/>
        {
            comments && comments.length>0 ?
            isHome ? 
            <Comment comment={comments[0]}/>
            :
            comments.map(comment=>
            <Comment comment={comment}/>
            )
            :null
        }
    </Card>
    
    </>
    

  )
}
