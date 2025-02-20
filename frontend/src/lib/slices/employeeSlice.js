import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../urls';

// Initial state
const initialState = {
  employees: [],
  loading: false,
  error: null
};

// Asynchronous Thunks for API Calls

// Fetch employees
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/employee-list`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
          },
      });  // Replace with your actual API endpoint
      return response.data;  // Return the data to the reducer
    } catch (error) {
      return rejectWithValue(error.response.data);  // Handle error by passing it to the reducer
    }
  }
);

// Create a new employee
export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, employeeData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        },
      });  // Replace with your actual API endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);  // Handle error by passing it to the reducer
    }
  }
);

// Update an existing employee
export const updateEmployeeDetails = createAsyncThunk(
  'employee/updateEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/employee/${employeeData.id}`, employeeData);  // Replace with your actual API endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete an employee
export const deleteEmployeeById = createAsyncThunk(
  'employee/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        },
      });  // Replace with your actual API endpoint
      return id;  // Return the employee id to remove from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice to handle the state
const employeeSlice = createSlice({
  name: 'employee',
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
    // Handling loading and success for fetch employees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling loading and success for create employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.message=''
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload.user);
        state.message=action.payload.message
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message=action.payload.message
      })
      // Handling loading and success for update employee
      .addCase(updateEmployeeDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployeeDetails.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex((employee) => employee.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployeeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling loading and success for delete employee
      .addCase(deleteEmployeeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(employee => employee._id !== action.payload);
      })
      .addCase(deleteEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const {
  setLoading,
  setError,
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = employeeSlice.actions;

// Export the reducer
export default employeeSlice.reducer;
