import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import bgvdo from "../assets/bgvideo/bgvdo.mp4"

import axios from "axios"
import toast from 'react-hot-toast';
import { FaUserAlt } from "react-icons/fa";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });


  const navigate = useNavigate()

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`


      try {
        const response = await axios.post(URL,data)
        
        toast.success(response.data.message)
        
        if(response.data.success){
          setData({
            email: "",
            
        })

          navigate('/password',{
            state : response?.data?.data
          })
        }


      } catch (error) {
        toast.error(error?.response?.data?.message)
      }

    console.log("data",data)
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  return (
    <div className="relative flex items-center justify-center h-screen">
    <video 
      className="absolute top-0 left-0 w-full h-full object-cover z-0" 
      autoPlay 
      loop 
      muted 
      playsInline
    >
      <source src={bgvdo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div className="relative bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto z-10 backdrop-blur-sm bg-opacity-30">

      <div className='flex justify-center items-center w-fit mx-auto mb-2'>
        <FaUserAlt
        size={55}/>
      </div>
      <h3 className="text-center">Welcome to BubbleTalk!</h3>

      <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="bg-slate-100 px-2 py-1 focus:outline-primary"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>

        

       

        <button className="bg-primary text-lg border rounded px-4 py-1 mt-4 hover:bg-secondary font-bold text-white leading-relaxed tracking-wide">
          Login
        </button>
      </form>

      <p className="my-3 text-center">
        New User? <Link to={"/register"} className="hover:text-primary font-semibold">Register</Link>
      </p>
    </div>
  </div>
  )
}

export default CheckEmailPage
