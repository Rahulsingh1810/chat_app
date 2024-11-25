import axios from 'axios';
import React, { useState } from 'react';
import uploadFile from '../helper/uploadFile';
import toast from 'react-hot-toast';

const EditUserDetails = ({ onClose, user }) => {
  const [updatedData, setUpdatedData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profile_pic: user?.profile_pic || "",
  });

  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);

    const uploadedImage = await uploadFile(file);
    setUpdatedData((prevData) => ({
      ...prevData,
      profile_pic: uploadedImage?.url || prevData.profile_pic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/update-user`,
        {
          name: updatedData.name,
          profile_pic: updatedData.profile_pic
        },
        {
          withCredentials: true,
        }
      );

      toast.success('User details updated successfully!');
      
      onClose();

    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Failed to update user details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Email Input */}
        {/* <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={updatedData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            readOnly
          />
        </div> */}

        {/* Profile Picture Input */}
        <div className="mb-4">
          <label htmlFor="profile_pic" className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            onChange={handleProfilePicChange}
            className="mt-1 block w-full"
            accept="image/*"
          />
          {profilePicFile && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(profilePicFile)}
                alt="Profile Preview"
                className="h-16 w-16 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        <button
          type="button"
          className="mt-2 text-gray-600 underline"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUserDetails;