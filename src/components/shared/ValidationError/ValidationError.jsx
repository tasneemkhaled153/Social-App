import React from 'react'

export default function ValidationError({error}) {
  return (
    <>
    {error && <p className='text-red-500'>{error.message}</p> }
    
    </>
        
  )
}
