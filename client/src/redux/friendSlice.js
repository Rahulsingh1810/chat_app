import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFriend = createAsyncThunk('friend/fetchFriend', async (friendId) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${friendId}`, { withCredentials: true });
  return response.data;
});

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    friend: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriend.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriend.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.friend = action.payload;
      })
      .addCase(fetchFriend.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default friendSlice.reducer;