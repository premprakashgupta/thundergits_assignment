import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leaveList: [],
  leaveStatus: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
  leaveError: null,
  applyingLeave: false,
  cancelingLeave: false,
  employeeLeaveList:[]
};

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    applyLeaveStart: (state) => {
      state.applyingLeave = true;
    },
    applyLeaveSuccess: (state, action) => {
      state.applyingLeave = false;
      // Assuming action.payload contains the applied leave data
      state.leaveList.push(action.payload.leave);
    },
    applyLeaveFailure: (state, action) => {
      state.applyingLeave = false;
      state.leaveError = action.payload;
    },

    cancelLeaveStart: (state) => {
      state.cancelingLeave = true;
    },
    cancelLeaveSuccess: (state, action) => {
      state.cancelingLeave = false;
      state.leaveList = state.leaveList.filter(leave => leave._id !== action.payload.id);
    },
    cancelLeaveFailure: (state, action) => {
      state.cancelingLeave = false;
      state.leaveError = action.payload;
    },

    fetchLeaveListStart: (state) => {
      state.leaveStatus = 'loading';
    },
    fetchLeaveListSuccess: (state, action) => {
      state.leaveStatus = 'succeeded';
      state.leaveList = action.payload;
    },
    fetchLeaveListFailure: (state, action) => {
      state.leaveStatus = 'failed';
      state.leaveError = action.payload;
    },
    fetchEmpLeaveListSuccess: (state, action) => {
      state.leaveStatus = 'succeeded';
      state.employeeLeaveList = action.payload;
    },
    

    approveLeaveSuccess: (state, action) => {
      const updatedLeave = action.payload.leaveRequest;
      console.log(action.payload)
      state.leaveList = state.leaveList.map(leave => leave._id === updatedLeave._id ? updatedLeave : leave);
    },
    rejectLeaveSuccess: (state, action) => {
      const updatedLeave = action.payload.leaveRequest;
      state.leaveList = state.leaveList.map(leave => leave._id === updatedLeave._id ? updatedLeave : leave);
    },
  },
});

export const {
  applyLeaveStart,
  applyLeaveSuccess,
  applyLeaveFailure,
  cancelLeaveStart,
  cancelLeaveSuccess,
  cancelLeaveFailure,
  fetchLeaveListStart,
  fetchLeaveListSuccess,
  fetchLeaveListFailure,
  fetchEmpLeaveListSuccess,
  approveLeaveSuccess,
  rejectLeaveSuccess,
} = leaveSlice.actions;

export default leaveSlice.reducer;
