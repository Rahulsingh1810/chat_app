import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logos/logo.png';

const Home = () => {
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderDefaultContent = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white">
      <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Cosmic Talks</h1>
      <p className="text-xl italic">chat among the stars</p>
    </div>
  );

  const isMessagePage = location.pathname.startsWith('/messages/');

  return (
    <div className="relative h-screen max-h-screen bg-gray-900 text-gray-300 flex">
      {!isMobile || !isMessagePage ? (
        <section
          className={`${
            isMobile ? 'absolute inset-0 z-10' : 'w-[300px]'
          } h-full bg-gray-800 transition-transform duration-300 ${
            isMobile ? 'translate-x-0' : ''
          }`}
        >
          <Sidebar />
        </section>
      ) : null}

      <section className="flex-1 h-full relative">
        {location.pathname === '/' ? renderDefaultContent() : <Outlet />}
      </section>
    </div>
  );
};

export default Home;