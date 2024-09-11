import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice'


export const store = configureStore({
  reducer: {
    user : useReducer
  },
})

// Redux action to update user state
export const updateUser = (userData) => ({
  type: 'UPDATE_USER',
  payload: userData,
});
