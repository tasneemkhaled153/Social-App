import React, { useState } from 'react'
import { Button, Label, TextInput ,Radio, Alert, Spinner} from "flowbite-react";
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import ValidationError from './../../../components/shared/ValidationError/ValidationError';
import axios from 'axios';
import { HiInformationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const defaultValues =
{
  name:"",
  email:"",
  password:"",
  rePassword:"",
  dateOfBirth:"",
  gender:""
}
// pass Test@1234
const schema=z.object({
  name:z.string().min(2,"Name must be at least 2 characters long"),
  email:z.email("Invalid email"),
  password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,{
    message:"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
  }),
  rePassword:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,{
    message:"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
  }),
  dateOfBirth:z.string().refine((value)=>{
    let date = new Date(value);
    let today = new Date();
    return date < today;
    // let age = today.getFullYear() - date.getFullYear();
    // if(age < 18){
    //   return false;
    // }
    // return true;
  },"Invalid date"),
  gender:z.enum(["male","female"],{
    message:"Gender is required"
  }),
}).refine((data)=>{
  return data.password === data.rePassword;
},{
  message:"Passwords do not match",
  path:["rePassword"]
});

export default function Register() {
  let navigate=useNavigate()
  let [apiError,setApiError]= useState(null);
  let [success,setSuccess]= useState(null);
  let {register,handleSubmit,formState:{errors ,isValid ,isSubmitting}}= useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

async function onSubmit(values){
  console.log(values);
  try{
    let {data}= await axios.post(`${import.meta.env.VITE_BASE_URL}users/signup`,values)
    console.log(data);
    setSuccess("User registered successfully");
    setApiError(null);
    setTimeout(() => {
      navigate("/login")
    }, 1500);
  }
  catch(error){
    console.log(error);
    setSuccess(null);
    setApiError(error.response.data.error);
  }
}

  return (
    <>
    <div className='max-w-lg mx-auto py-12'>
      <div className='bg-white shadow-lg dark:bg-gray-800 p-6'>
        <h2 className='text-center'>Register</h2>
        {
          apiError && <Alert className='my-2' color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{apiError}</span>
    </Alert>
        }
        {
          success && <Alert className='my-2' color="success" icon={HiInformationCircle}>
      <span className="font-medium">{success}</span>
    </Alert>
        }
        
    <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col gap-4">
      {/* ************************ Email ************************ */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email">Your email</Label>
        </div>
                    <TextInput id="email" type="text" placeholder="tasneem@example.com"  shadow {...register("email")} />
        {/* <p className='text-red-500'>{errors.email?.message}</p> */}
        <ValidationError error={errors.email}/>
      </div>

      {/* ************************ Name ************************ */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name">Your Name</Label>
        </div>
                    <TextInput id="name" type="text" placeholder="Tasneem"  shadow {...register("name")}/>
        <ValidationError error={errors.name}/>
      </div>

      {/* ************************ Password ************************ */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your Password</Label>
        </div>
        <TextInput id="password" type="password" placeholder="**********"  shadow {...register("password")}/>
        <ValidationError error={errors.password}/>
      </div>

      {/* ************************ Confirm Password ************************ */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="rePassword">Confirm Password</Label>
        </div>
        <TextInput id="rePassword" type="password" placeholder="**********"  shadow {...register("rePassword")}/>
        <ValidationError error={errors.rePassword}/>
      </div>

      {/* ************************ Date of Birth ************************ */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
        </div>
        <TextInput id="dateOfBirth" type="date"  shadow {...register("dateOfBirth")}/>
        <ValidationError error={errors.dateOfBirth}/>
      </div>

      {/* ************************ Gender ************************ */}
      
      <div className="flex max-w-md flex-col gap-4">
        <div className="mb-2 block">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
        </div>
      <div className="flex items-center gap-2">
        <Radio id="female" value="female"  {...register("gender")}/>
        <Label htmlFor="female">Female</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="male" value="male"  {...register("gender")}/>
        <Label htmlFor="male">Male</Label>
      </div>
      </div>
      <ValidationError error={errors.gender}/>
      <Button disabled={!isValid} type="submit"> { isSubmitting && <Spinner aria-label="Spinner button example" size="sm" light /> } <span className="pl-3">Submit</span></Button>
        </form>
      </div>
      
    </div>
    
    </>
  )
}
