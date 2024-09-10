import React from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='w-full h-full'>
        <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-700' >
            <NavLink className='w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'title='chat'>
              <IoChatbubbleEllipsesOutline
              size={30}/>
            </NavLink>

            
            <NavLink className='w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'title='new user'>
              <FaUserPlus
                size={30}
              />
              
            </NavLink>

            <NavLink className='w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'title='Ask gemini'>
                <FaMeta
                size={30}/>
            </NavLink>
                
        </div>
    </div>
  )
}

export default Sidebar
