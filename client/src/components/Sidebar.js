import React, { useState } from 'react';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import axios from 'axios';

const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [editUserOpen,setEditUserOpen]= useState(false)



    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        // Call the logout API
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {}, { withCredentials: true });
    
        if (response.data.success) {
          // Clear the session storage and navigate to login page
          localStorage.removeItem("authToken");
          sessionStorage.clear();
    
          // Navigate to the login page or email page
          navigate("/email");
        } else {
          console.log("Logout failed: ", response.data.message);
        }
      } catch (error) {
        console.error("Error during logout: ", error);
      }
    };


  return (
    <div className='w-full h-full flex flex-col justify-between'>
      {/* Top Section with Chat, Add User, and Ask Gemini */}
      <div className='bg-slate-100 w-12 h-full flex flex-col py-5 text-slate-600'>
        <NavLink
          to="/chat"
          className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive ? "bg-slate-200" : ""}`}
          title='Chat'
        >
          <IoChatbubbleEllipsesOutline size={30} />
        </NavLink>

        <NavLink
          to="/add-user"
          className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive ? "bg-slate-200" : ""}`}
          title='New User'
        >
          <FaUserPlus size={30} />
        </NavLink>

        <NavLink
          to="/ask-gemini"
          className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive ? "bg-slate-200" : ""}`}
          title='Ask Gemini'
        >
          <SiGooglegemini size={30} />
        </NavLink>
      </div>

      {/* Bottom Section with User Details and Logout */}
      <div className='bg-slate-100 w-12 flex flex-col justify-center items-center pb-5 space-y-4'>
        {/* User Details Button */}
        <button className='mx-auto' title={user?.name} onClick={()=>setEditUserOpen(true)}>
          <Avatar
          width={35}
          height={35}
          name={user?.name}
          imageUrl={user?.profile_pic}/>

        </button>

        {/* Logout Button */}
        <button
          className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive ? "bg-slate-200" : ""}`}
          title='Logout'
          onClick={handleLogout}
        >
          <TbLogout2 size={30} />
        </button>
      </div>

          {/**edit user details*/}
          {
            editUserOpen && (
              <EditUserDetails onClose= {()=> setEditUserOpen(false)} user={user}/>
            )
          }

    </div>
  );
}

export default Sidebar;
