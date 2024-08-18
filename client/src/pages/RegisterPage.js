import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import bgvdo from "../assets/bgvideo/bgvdo.mp4"

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });

  const [UploadPhoto, setUploadPhoto] = useState("");

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
  };

  const handleClearUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadPhoto(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

      <div className="relative bg-white w-full max-w-sm  rounded overflow-hidden p-4 mx-auto z-10 backdrop-blur-sm bg-opacity-30">
        <h3 className="text-center">Welcome to BubbleTalk!</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

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

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo:
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {UploadPhoto?.name ? UploadPhoto?.name : "Upload Profile Photo"}
                </p>
                {UploadPhoto?.name && (
                  <button className="text-lg ml-2 hover:text-red-600" onClick={handleClearUploadPhoto}>
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="bg-primary text-lg border rounded px-4 py-1 mt-4 hover:bg-secondary font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>

        <p className="my-3 text-center">
          Already have an account? <Link to={"/email"} className="hover:text-primary font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
