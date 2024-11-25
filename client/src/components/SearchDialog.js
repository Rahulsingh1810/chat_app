import React, { useState } from 'react';
import axios from 'axios';
import Avatar from './Avatar';

const SearchDialog = ({ onClose, onAddFriend }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/search-users?term=${searchTerm}`, { withCredentials: true });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleAddFriend = async (userId) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/add-friend`, { friendId: userId }, { withCredentials: true });
            onAddFriend();
            onClose();
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">Add Friend</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email"
                className="w-full px-3 py-2 border rounded-lg mb-4"
            />
            <button
                onClick={handleSearch}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary mb-4"
            >
                Search
            </button>
            <div className="flex-1 overflow-y-auto">
                {searchResults.map((user) => (
                    <div key={user._id} className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <Avatar width={40} height={40} name={user.name} imageUrl={user.profile_pic} />
                            <div className="ml-2">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleAddFriend(user._id)}
                            className="bg-primary text-white px-2 py-1 rounded hover:bg-secondary"
                        >
                            Add Friend
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={onClose} className="mt-4 text-gray-600 underline">Close</button>
        </div>
    );
};

export default SearchDialog;