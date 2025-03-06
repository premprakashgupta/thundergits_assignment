import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../urls';

// Initial state
const initialState = {
  students: [],
  loading: false,
  error: null,
  message: '',
};

// Asynchronous Thunks for API Calls

// Fetch students
export const fetchStudents = createAsyncThunk(
  'student/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/students`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new student
export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (studentData, { rejectWithValue }) => {
    console.log(...studentData)
    try {
      const response = await axios.post(`${BASE_URL}/student/create`, studentData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update an existing student
export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async (studentData, { rejectWithValue }) => {
    
    try {
      const response = await axios.put(`${BASE_URL}/student/${studentData.get('_id')}`, studentData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a student
export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/student/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice to handle the state
const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.message = '';
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload.student);
        state.message = action.payload.message;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload.message;
      })
      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        const index = state.students.findIndex((student) => student._id === action.payload.student._id);
        if (index !== -1) {
          state.students[index] = action.payload.student;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter((student) => student._id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setLoading, setError } = studentSlice.actions;

// Export the reducer
export default studentSlice.reducer;
