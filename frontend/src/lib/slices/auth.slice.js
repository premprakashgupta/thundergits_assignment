import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for the auth slice
const initialState = {
  user: null,
  error: null,
  message: "",
  loading: false,
  isAuthenticated: false // To keep track of authentication status
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwia…4Njl9.FT6ii8VG1kJsPq53mBa_8JHD6NIMm-yKaSS0Xg1yxwg

// Async action for signup
export const signupAsync = createAsyncThunk(
  'auth/signupAsync',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Return the data to be stored in the state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Signup failed');
    }
  }
);

// Async action for login
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/employees/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data; // Return the user data and token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Login failed');
    }
  }
);

// Async action for checking authentication status (authMe)
export const authMeAsync = createAsyncThunk(
  'auth/authMeAsync',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        },
      });
      return response.data; // Return user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Authentication failed');
    }
  }
);

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.message = 'Logged out successfully';
      localStorage.removeItem('token'); // Clear token from localStorage
    },
    clearError: (state) => {
      state.error = null;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle the signup async states
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = 'Signup successful!';
        localStorage.setItem('token', action.payload.token); // Save token to localStorage
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred during signup';
      })

      // Handle the login async states
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = 'Login successful!';
        localStorage.setItem('token', action.payload.token); // Save token to localStorage
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred during login';
      })

      // Handle the authMe async states
      .addCase(authMeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authMeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.message = 'User authenticated';
      })
      .addCase(authMeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Authentication failed';
        state.isAuthenticated = false;
      });
  }
});

// Action creators are generated for each case reducer function
export const { logout, clearError } = authSlice.actions;

// Export reducer to be used in the store
export default authSlice.reducer;
