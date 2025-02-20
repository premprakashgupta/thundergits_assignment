import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action to mark attendance
export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async (attendanceData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/employees/mark-attendance', attendanceData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        },
      });
      return response.data;  // Assuming the response has the attendance data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action to fetch attendance list
export const fetchAttendanceList = createAsyncThunk(
  'attendance/fetchAttendanceList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees/attendance',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        },
      });
      return response.data;  // Assuming the response has the list of attendance
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action to fetch attendance by user ID
export const fetchAttendanceByUserId = createAsyncThunk(
  'attendance/fetchAttendanceByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/attendance/${userId}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        },
      });
      return response.data;  // Assuming the response has the attendance data for the user
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendanceList: [],
    currentAttendance: null,
    userAttendance:[],
    loading: false,
    error: null,
  },
  reducers: {
    // Any additional actions you want to define can go here
  },
  extraReducers: (builder) => {
    // Handling markAttendance action
    builder.addCase(markAttendance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.currentAttendance = action.payload;  // Storing the response data after marking attendance
    });
    builder.addCase(markAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Setting error if any
    });

    // Handling fetchAttendanceList action
    builder.addCase(fetchAttendanceList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAttendanceList.fulfilled, (state, action) => {
      state.loading = false;
      state.attendanceList = action.payload;  // Storing the list of attendance
    });
    builder.addCase(fetchAttendanceList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Setting error if any
    });

    // Handling fetchAttendanceByUserId action
    builder.addCase(fetchAttendanceByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAttendanceByUserId.fulfilled, (state, action) => {
      state.loading = false;
      state.userAttendance = action.payload;  // Storing the specific user attendance data
    });
    builder.addCase(fetchAttendanceByUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Setting error if any
    });
  },
});

export default attendanceSlice.reducer;
