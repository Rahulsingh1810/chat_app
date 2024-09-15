import React, { useState } from 'react';
import axios from 'axios';
import Avatar from './Avatar';

const SearchDialog = ({ onClose, onAddUser }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/search-users?term=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add User</h2>
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
                <div className="max-h-60 overflow-y-auto">
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
                                onClick={() => onAddUser(user)}
                                className="bg-primary text-white px-2 py-1 rounded hover:bg-secondary"
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 text-gray-600 underline"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SearchDialog;