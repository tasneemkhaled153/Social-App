import React from 'react'
import { Outlet } from 'react-router-dom'
import AppNav from './../AppNav/AppNav';
import AppFooter from './../AppFooter/AppFooter';

export default function Layout() {
  return (
    <>
    <div className='bg-slate-100 dark:bg-gray-900 dark:text-white'>
        <AppNav/>
    <div className='min-h-[90vh]'>
    
    <Outlet/>
    </div>
    <AppFooter/>
    </div>
    
    </>
  )
}
