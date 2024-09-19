import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import Avatar from './Avatar';
import { FaEllipsisV } from 'react-icons/fa';
import { fetchFriend } from '../redux/friendSlice';
import { IoArrowBack } from 'react-icons/io5';
import wallpaper from '../assets/wallpaper/wall3.jpeg';
import uploadFile from '../helper/uploadFile';

const MessagePage = () => {
  const { friendId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const friend = useSelector((state) => state.friend.friend);
  const friendStatus = useSelector((state) => state.friend.status);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const token = useSelector((state) => state.user.token);

  const fetchMessages = async () => {
    try {
        console.log('Fetching messages for friendId:', friendId);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get-messages/${friendId}`, { withCredentials: true });
        console.log('Response data:', response.data);
        setMessages(response.data);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

  useEffect(() => {
    if (friendId) {
      dispatch(fetchFriend(friendId));
      fetchMessages();

      const newSocket = io(process.env.REACT_APP_BACKEND_URL);
      setSocket(newSocket);

      newSocket.emit('joinRoom', friendId);

      newSocket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [friendId, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '' || selectedFile) {
      try {
        let fileUrl = '';
        if (selectedFile) {
          const uploadResult = await uploadFile(selectedFile);
          fileUrl = uploadResult.secure_url;
        }

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/send-message`, {
          receiverId: friendId,
          text: inputMessage,
          imageUrl: fileUrl,
        },  {
          headers: {
            Authorization: `Bearer ${token}` // Add this line
          },
          withCredentials: true // Ensure cookies are sent
        });

        const newMessage = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage('');
        setSelectedFile(null);

        if (socket) {
          socket.emit('sendMessage', { roomId: friendId, message: newMessage });
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

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
      <div className="flex-1 p-4 overflow-y-auto" style={{ 
        backgroundImage: `url(${wallpaper})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        imageRendering: 'auto'
      }}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === currentUser._id ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {message.text}
              {message.imageUrl && (
                <img src={message.imageUrl} alt="Uploaded" className="mt-2 max-w-xs rounded" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input field and send button */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 p-2 rounded bg-gray-700 text-white"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="ml-2 p-2 bg-gray-600 text-white rounded cursor-pointer">
            Attach
          </label>
          <button 
            className="ml-2 p-2 bg-blue-600 text-white rounded"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;