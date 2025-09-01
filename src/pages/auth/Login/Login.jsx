import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiInformationCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import * as z from "zod"
import { Button, Label, TextInput ,Alert, Spinner} from "flowbite-react";
import ValidationError from '../../../components/shared/ValidationError/ValidationError'
import { UserContext } from '../../../context/UserContext'
const defaultValues =
{
  
  email:"",
  password:"",
  
}

const schema=z.object({
  email:z.email("Invalid email"),
  password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,{
    message:"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
  })
 
})
export default function Login() {
  const {token,setToken} = useContext(UserContext);
  console.log(token);
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
        let {data}= await axios.post(`${import.meta.env.VITE_BASE_URL}users/signin`,values)
        console.log(data);
        setSuccess("User logged in successfully");
        setApiError(null);
        setTimeout(() => {
          localStorage.setItem("token",data.token);
          setToken(data.token);
          navigate("/")
        }, 1500);
      }
      catch(error){
        console.log(error);
        setSuccess(null);
        setApiError(error.response.data.error);
      }
    }
  return (
     <div className='max-w-lg mx-auto py-12'>
          <div className='bg-white shadow-lg dark:bg-gray-800 p-6'>
            <h2 className='text-center'>Login</h2>
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

          {/* ************************ Password ************************ */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">Your Password</Label>
            </div>
            <TextInput id="password" type="password" placeholder="**********"  shadow {...register("password")}/>
            <ValidationError error={errors.password}/>
          </div>

          <Button disabled={!isValid} type="submit"> { isSubmitting && <Spinner aria-label="Spinner button example" size="sm" light /> } <span className="pl-3">Submit</span></Button>
            </form>
          </div>
          
        </div>
  )
}
