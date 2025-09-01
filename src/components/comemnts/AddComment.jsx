import React from 'react'
import { Label, Spinner, Textarea } from 'flowbite-react';
import { Card } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import ValidationError from '../shared/ValidationError/ValidationError';
import { Button } from 'flowbite-react';
export default function AddComment({post_id}) {
    let{register,handleSubmit, formState:{errors,isSubmitting,isValid} ,reset}=useForm({})
    let queryClient = useQueryClient();
    async function AddComment(values){
        return await axios.post(`${import.meta.env.VITE_BASE_URL}comments`,{...values,post:post_id},{
            headers:{

                token:localStorage.getItem("token")
            }
        })
        
    }
    let{mutate:handleAddComment}=useMutation({
        mutationFn:AddComment,
        onSuccess:()=>{
            toast.success("Comment added successfully");
            queryClient.invalidateQueries(["posts"])
            
            reset();
        },
        onError:()=>{
            toast.error("Comment added failed");
        }
        
    })
  return (<>
 
          <form onSubmit={handleSubmit(handleAddComment)} className="flex flex-col gap-4">
          <Textarea id="content" placeholder="Post something..."  rows={2} {...register("content",{required:"Post body is required"})}/>
          <ValidationError error={errors.body}/>
            <Button disabled={!isValid || isSubmitting} type="submit">{
              isSubmitting && <Spinner aria-label="Spinner button example" size="sm" light />
            }<span className='pl-3'>Submit</span></Button>
          </form>
       
  </>
    
  )
}
