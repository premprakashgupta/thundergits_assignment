import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import studentReducer from './slices/studentSlice'
import authMiddleware from '../middlewares/authMiddleware'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    student: studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
})