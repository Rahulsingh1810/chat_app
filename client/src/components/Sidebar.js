import React from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='w-full h-full'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600' >
            <NavLink className={(isActive)=>`w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200"}`}title='chat'>
              <IoChatbubbleEllipsesOutline
              size={30}/>
            </NavLink>

            
            <NavLink className={`w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'title='new user`}>
              <FaUserPlus
                size={30}
              />
              
            </NavLink>

            <NavLink className='w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'title='Ask gemini'>
                <SiGooglegemini
                size={30}/>
            </NavLink>
                
        </div>
    </div>
  )
}

export default Sidebar
