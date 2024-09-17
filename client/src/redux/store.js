import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice'
import friendReducer from './friendSlice'


export const store = configureStore({
  reducer: {
    user : useReducer,
    friend : friendReducer
  },
});

// Redux action to update user state
export const updateUser = (userData) => ({
  type: 'UPDATE_USER',
  payload: userData,
});
