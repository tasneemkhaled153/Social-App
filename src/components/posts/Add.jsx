import React from 'react'
import { Button, Card, Checkbox, Label, Spinner, Textarea, TextInput } from "flowbite-react";
import { IoMdCloudUpload } from "react-icons/io";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ValidationError from './../shared/ValidationError/ValidationError';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Add() {
  let{userData}= useContext(UserContext);
  let{register,handleSubmit, formState:{errors,isSubmitting,isValid} ,reset}=useForm({})
  let queryClient = useQueryClient();
  let{mutate:handleAddPost}=useMutation({
    mutationFn:AddPost,
    onSuccess:()=>{
      toast.success("Post added successfully");
      queryClient.invalidateQueries({
        queryKey:["posts"]
      })
      queryClient.invalidateQueries({
        queryKey:["user",userData?._id]
      })
      reset();
    },
    onError:()=>{
      toast.error("Post added failed");
    }

  })
  async function AddPost(values){
    console.log(values);
    let formData = new FormData();
    formData.append("body",values.body);
    if(values.image[0]){
    formData.append("image",values.image[0]);
    }
      return await axios.post(`${import.meta.env.VITE_BASE_URL}posts`,formData,{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      
    
  }
  return (
    <Card >
      <form onSubmit={handleSubmit(handleAddPost)} className="flex flex-col gap-4">
      <div className="mb-2 block">
        <Label htmlFor="comment">Post something</Label>
      </div>
      <div className='flex items-center gap-2'>
      <Textarea id="comment" placeholder="Post something..."  rows={4} {...register("body",{required:"Post body is required"})}/>
      
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
    </Card>
  )
}
