import React, { useState } from 'react';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from './Avatar';
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import logo from '../assets/logos/logo.png';
import SearchDialog from './SearchDialog';

const Sidebar = () => {
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Toggle sidebar on mobile
    const navigate = useNavigate();
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
const [addedUsers, setAddedUsers] = useState([]);

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
                    <NavLink
                        to="/chat"
                        className={({ isActive }) =>
                            `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-700 rounded ${isActive ? "bg-gray-700 text-white" : ""}`
                        }
                        title="Chat"
                    >
                        <IoChatbubbleEllipsesOutline size={30} />
                    </NavLink>

                    <button
    onClick={() => setSearchDialogOpen(true)}
    className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-gray-700 rounded"
    title="New User"
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
                    <button className="mx-auto" title={user?.name} onClick={() => setEditUserOpen(true)}>
                        <Avatar width={35} height={35} name={user?.name} imageUrl={user?.profile_pic} />
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

            {/* Second Column (Chats section) */}
            {/* Second Column (Chats section) */}
<div className={`flex-1 p-4 overflow-y-auto ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
    <div className="text-white">
        <h2 className='text-xl font-bold p-2'>Messages</h2>
        {addedUsers.map((user) => (
            <div key={user._id} className="flex items-center mb-2">
                <Avatar width={40} height={40} name={user.name} imageUrl={user.profile_pic} />
                <span className="ml-2">{user.name}</span>
            </div>
        ))}
    </div>
</div>

{/* SearchDialog */}
{searchDialogOpen && (
    <SearchDialog
        onClose={() => setSearchDialogOpen(false)}
        onAddUser={(user) => {
            setAddedUsers((prevUsers) => [...prevUsers, user]);
            setSearchDialogOpen(false);
        }}
    />
)}



            {/* Toggle Button for Sidebar on Mobile */}
            <button
                className="fixed bottom-4 right-4 bg-gray-700 text-white p-3 rounded-full md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? 'Close' : 'Chats'}
            </button>

            {/* Edit user details dialog */}
            {editUserOpen && <EditUserDetails onClose={() => setEditUserOpen(false)} />}
        </div>
    );
};

export default Sidebar;
