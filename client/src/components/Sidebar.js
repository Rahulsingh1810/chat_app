import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from './Avatar';
import EditUserDetails from './EditUserDetails';
import SearchDialog from './SearchDialog';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";
import logo from '../assets/logos/logo.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [showFriendsList, setShowFriendsList] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/friends`, { withCredentials: true });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
    fetchFriends();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/email");
  };

  return (
    <div className="w-full h-full flex bg-gray-800 text-gray-300">
      {/* First Column (Icons) */}
      <div className="w-[50px] flex flex-col justify-between py-5">
        {/* Logo at the top */}
        <div className="flex justify-center items-center mb-5">
          <img src={logo} alt="Logo" className="w-8 h-8" />
        </div>

        {/* Navigation icons */}
        <div className="flex flex-col">
          <button
            onClick={() => setShowFriendsList(!showFriendsList)}
            className={`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-700 rounded ${showFriendsList ? "bg-gray-700 text-white" : ""}`}
            title="Chat"
          >
            <IoChatbubbleEllipsesOutline size={30} />
          </button>

          <button
            onClick={() => setSearchDialogOpen(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-700 rounded"
            title="Add Friend"
          >
            <FaUserPlus size={30} />
          </button>

          <NavLink
            to="/gemini"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-700 rounded ${isActive ? "bg-gray-700 text-white" : ""}`
            }
            title="Ask Gemini"
          >
            <SiGooglegemini size={30} />
          </NavLink>
        </div>

        {/* Bottom Section with User Details and Logout */}
        <div className="flex flex-col justify-center items-center space-y-4">
          {/* User Details Button */}
          <button 
            className="mx-auto w-10 h-10 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center" 
            title={user?.name} 
            onClick={() => setEditUserOpen(true)}
          >
            {user?.name && (
              <Avatar 
                width={40}
                height={40}
                name={user.name}
                imageUrl={user.profile_pic}
                UserId={user.id}
              />
            )}
          </button>

          {/* Logout Button */}
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-red-600 rounded text-gray-300 hover:text-white"
            title="Logout"
            onClick={handleLogout}
          >
            <TbLogout2 size={30} />
          </button>
        </div>
      </div>

      {/* Second Column (Friends list or Dialogs) */}
      <div className={`flex-1 p-4 overflow-y-auto ${ showFriendsList ? 'block' : 'hidden'} md:block`}>
        {showFriendsList && (
          <div className="text-white">
            <h2 className='text-xl font-bold p-2'>Friends</h2>
            {friends.map((friend) => (
              <div 
                key={friend._id} 
                className="flex items-center mb-2 cursor-pointer"
                onClick={() => {
                  navigate(`/messages/${friend._id}`);
                  if (window.innerWidth <= 768) {
                    setShowFriendsList(false);
                  }
                }}
              >
                <Avatar 
                  width={40} 
                  height={40} 
                  name={friend.name} 
                  imageUrl={friend.profile_pic}
                  UserId={friend._id}
                />
                <span className="ml-2">{friend.name}</span>
              </div>
            ))}
          </div>
        )}
        {searchDialogOpen && (
          <SearchDialog
            onClose={() => setSearchDialogOpen(false)}
            onAddFriend={() => {
              const fetchFriends = async () => {
                try {
                  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/friends`, { withCredentials: true });
                  setFriends(response.data);
                } catch (error) {
                  console.error('Error fetching friends:', error);
                }
              };
              fetchFriends();
            }}
          />
        )}
        {editUserOpen && <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />}
      </div>
    </div>
  );
};

export default Sidebar;