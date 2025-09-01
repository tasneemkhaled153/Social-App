import React, { useState } from 'react'
import { Avatar, Button, Spinner, Textarea } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import DropDownMenu from '../shared/DropDownMenu/DropDownMenu';
import ValidationError from './../shared/ValidationError/ValidationError';


export default function Comment({ comment }) {
  let { commentCreator: { name: userName, _id: user_id, photo: userImage }, content, createdAt, post: post_id, _id: comment_id } = comment;
  let [isEdit, setIsEdit] = useState(false);
  let { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({})
  let queryClient = useQueryClient();

  let { mutate: handleEditComment } = useMutation({
    mutationFn: EditComment,
    onSuccess: () => {
      toast.success("Comment edited successfully");
      setIsEdit(false);
      queryClient.invalidateQueries(["posts"])

    },
    onError: () => {
      toast.error("Comment edited failed");
    }

  })
  function deleteComment() {
    return axios.delete(`${import.meta.env.VITE_BASE_URL}comments/${comment_id}`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
  }
  let {mutate:handleDeleteComment}=useMutation({
    mutationFn:deleteComment,
    onSuccess:()=>{
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries(["posts"])
    },
    onError:()=>{
      toast.error("Comment deleted failed");
    }
  })
  function EditComment(values) {
    return axios.put(`${import.meta.env.VITE_BASE_URL}comments/${comment_id}`, values, {
      headers: {


        token: localStorage.getItem("token")
      }
    })
  }

  return (
    <>
      <section>
        <header>
          <div className='flex justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar alt="User settings" img={userImage.includes("undefined") ? "https://flowbite.com/docs/images/people/profile-picture-5.jpg" : userImage} rounded />
              <div>
                <h2 className='text-lg m-0'>{userName}</h2>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <DropDownMenu onEdit={() => { setIsEdit(true)  }} onDelete={handleDeleteComment} />
          </div>

        </header>
        {/* body */}
        {isEdit ?

          <form onSubmit={handleSubmit(handleEditComment)} className="flex flex-col gap-4">
            <Textarea id="content" placeholder="Post something..." rows={2} {...register("content", { required: "Post body is required" })} defaultValue={content} />
            <ValidationError error={errors.body} />
            <div className='flex gap-2'>
               <Button disabled={!isValid || isSubmitting} type="submit">{
              isSubmitting && <span className='pl-3'><Spinner aria-label="Spinner button example" size="sm" light /></span>
            }Submit</Button>
            <Button color="red" type="submit" onClick={()=>setIsEdit(false)}>Cancel</Button>
            </div>
            
          </form>
          : <h3 className=" ps-12 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {content}
          </h3>}
      </section>

    </>
  )
}
