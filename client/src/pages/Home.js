import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-screen max-h-screen bg-gray-900 text-gray-300 flex">
      {/* Sidebar */}
      <section
        className={`${
          isMobile ? 'absolute inset-0 z-10' : 'w-[300px]'
        } h-full bg-gray-800 transition-transform duration-300 ${
          isMobile && !showSidebar ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <Sidebar />
      </section>

      {/* Main content */}
      <section className="flex-1 h-full relative">
        <Outlet />
      </section>

      {/* Toggle button for mobile */}
      {/* {isMobile && (
        <button
          className="fixed bottom-4 right-4 bg-gray-700 text-white p-3 rounded-full z-20"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Close' : 'Menu'}
        </button>
      )} */}
    </div>
  );
};

export default Home;