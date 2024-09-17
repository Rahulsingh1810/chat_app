import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from './Avatar';
import { FaEllipsisV } from 'react-icons/fa';
import { fetchFriend } from '../redux/friendSlice';
import { IoArrowBack } from 'react-icons/io5';

const MessagePage = () => {
  const { friendId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const friend = useSelector((state) => state.friend.friend);
  const friendStatus = useSelector((state) => state.friend.status);

  useEffect(() => {
    if (friendId) {
      dispatch(fetchFriend(friendId));
    }
  }, [friendId, dispatch]);

  if (friendStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (friendStatus === 'failed') {
    return <div>Error loading friend details</div>;
  }

  if (!friend) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Chat header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Back button for mobile */}
          <button 
            className="text-gray-400 hover:text-white md:hidden mr-3"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={24} />
          </button>
          <Avatar 
            width={40} 
            height={40} 
            name={friend.name} 
            imageUrl={friend.profile_pic}
            UserId={friend._id}
          />
          <div className="ml-3">
            <h2 className="font-semibold text-white">{friend.name}</h2>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${friend.online ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></div>
              <span className="text-sm text-gray-400">{friend.online ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <FaEllipsisV />
        </button>
      </div>
      {/* Chat content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Chat messages will go here */}
      </div>
    </div>
  );
};

export default MessagePage;