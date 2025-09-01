import React, { useContext } from 'react'
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
  } from "flowbite-react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
export default function AppNav() {
  const {token,setToken,userData ,setUserData} = useContext(UserContext);
  let navigate = useNavigate()
  function handleSignout(){
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
     <Navbar  className='shadow-lg' >
      <NavbarBrand as={Link} to="/">
        
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tasneem</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            userData?
            <Avatar alt="User settings" img={userData.photo} rounded />
            :
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          {userData && <DropdownHeader>
            
            <span className="block text-sm">  {userData.name}</span>
            <span className="block truncate text-sm font-medium">{userData.email}</span>
          </DropdownHeader>
          }
         
          
          {
            !token ?
            <>
            <DropdownItem as={Link} to="/login">Login</DropdownItem>
            <DropdownItem as={Link} to="/register">Register</DropdownItem>
            </>
            :

            <>
            <DropdownItem as={Link} to="/profile">Profile</DropdownItem>
            <DropdownDivider />
          <DropdownItem as="button" onClick={handleSignout}>Sign out</DropdownItem></>
          }
          
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {
          token&&<>
          <NavbarLink as={NavLink} to="" >
          Home
        </NavbarLink>
        <NavbarLink as={NavLink} to="">Posts</NavbarLink>
          </>
        }
        
        
      </NavbarCollapse>
    </Navbar>
    </>
  )
}
