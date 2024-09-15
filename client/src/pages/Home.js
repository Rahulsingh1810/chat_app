import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout, setUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logos/logo.png';

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detect mobile
  const basePath = location.pathname === '/'; // Detect if on home page (no chat selected)

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });
        
      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate('/email');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update state on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-screen max-h-screen bg-gray-900 text-gray-300 flex">
      {/* Sidebar */}
      <section
        className={`lg:w-[300px] sm:w-full h-full bg-gray-800 transition-transform duration-300 
        ${isMobile ? (basePath ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}
      >
        <Sidebar />
      </section>

      {/* Main content */}
      <section
        className={`flex-1 h-full relative w-full transition-transform duration-300 
        ${isMobile && !basePath ? 'translate-x-0' : (isMobile ? 'translate-x-full' : 'translate-x-0')}`}
      >
        {basePath && (
          <div className="hidden lg:flex flex-col items-center justify-center absolute inset-0 bg-gray-900">
            <img src={logo} width={200} alt="logo" />
            <p className="mt-4 text-xl font-semibold text-gray-300">Chat Among the Stars</p>
          </div>
        )}
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
