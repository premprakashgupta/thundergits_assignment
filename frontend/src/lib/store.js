import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import employeeReducer from './slices/employeeSlice'
import attendanceReducer from './slices/attendanceSlice'
import leaveReducer from './slices/leaveSlice'
import authMiddleware from '../middlewares/authMiddleware'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    employee: employeeReducer,
    attendance:attendanceReducer,
    leave:leaveReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
})