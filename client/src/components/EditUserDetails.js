import axios from 'axios';
import React, { useState } from 'react';
import uploadFile from '../helper/uploadFile';
import toast from 'react-hot-toast'; // Optional for notifications

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

    const uploadedImage = await uploadFile(file); // Function to upload image to Cloudinary or another service
    setUpdatedData((prevData) => ({
      ...prevData,
      profile_pic: uploadedImage?.url || prevData.profile_pic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to update user details
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/update-user`, // Your API endpoint
        {
          name: updatedData.name,
          profile_pic: updatedData.profile_pic
        },
        {
          withCredentials: true, // Ensures cookies (token) are sent with the request
        }
      );

      // Handle success response
      toast.success('User details updated successfully!');
      console.log('Response:', response.data);

      // Close the modal on success
      onClose();

    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Failed to update user details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Edit User Details</h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* Name Input */}
          <div>
            <label htmlFor='name' className='block text-sm font-medium'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={updatedData.name}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-lg'
              required
            />
          </div>

          {/* Email Input */}
          {/* <div>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email (optional)
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={updatedData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-lg'
              readOnly
            />
          </div> */}

          {/* Profile Picture Upload */}
          <div>
            <label htmlFor='profile_pic' className='block text-sm font-medium'>
              Profile Picture
            </label>
            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              onChange={handleProfilePicChange}
              className='w-full px-3 py-2 border rounded-lg'
            />
            {profilePicFile && (
              <div className='mt-2'>
                <img
                  src={URL.createObjectURL(profilePicFile)}
                  alt='Profile Preview'
                  className='h-16 w-16 object-cover rounded-full'
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary'
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type='button'
            className='mt-2 text-gray-600 underline'
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
