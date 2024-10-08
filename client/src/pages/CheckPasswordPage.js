import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import bgvdo from "../assets/bgvideo/bgvdo.mp4"

import axios from "axios"
import toast from 'react-hot-toast';

import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import {setToken, setUser} from "../redux/userSlice"

const CheckPasswordPage = () => {

  const [data, setData] = useState({
    password: "",
    userId : ""
  });


  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()



  useEffect(()=>{
    if(!location?.state?.name){
      navigate('/email')
    }
  },[])

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

    

      try {
        const response = await axios({
          method : 'post',
          url : URL,
          data : {
            userId : location?.state?._id,
              password : data.password
          },
          withCredentials : true,
          

        })
        
        toast.success(response.data.message)
        
        if(response.data.success){

          dispatch(setToken(response?.data?.token))
          localStorage.setItem('token',response?.data?.token)

          setData({
            password: "",
            
        })

          navigate('/')
        }


      } catch (error) {
        toast.error(error?.response?.data?.message)
      }

   
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

      <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
        {/* <FaUserAlt
        size={55}/> */}
        <Avatar
        width={55}
        height={55}
        name={location?.state?.name}
        imageUrl={location?.state?.profile_pic}/>

          <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>


      </div>


      <h3 className="text-center">Welcome to BubbleTalk!</h3>

      <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>

      <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

        

       

        <button className="bg-primary text-lg border rounded px-4 py-1 mt-4 hover:bg-secondary font-bold text-white leading-relaxed tracking-wide">
          Login
        </button>
      </form>

      <p className="my-3 text-center">
        <Link to={"/forgot-password"} className="hover:text-primary font-semibold">Forgot Password</Link>
      </p>
    </div>
  </div>
  )
}

export default CheckPasswordPage