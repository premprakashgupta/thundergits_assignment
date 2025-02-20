import axios from 'axios';
import {
  applyLeaveStart,
  applyLeaveSuccess,
  applyLeaveFailure,
  cancelLeaveStart,
  cancelLeaveSuccess,
  cancelLeaveFailure,
  fetchLeaveListStart,
  fetchLeaveListSuccess,
  fetchLeaveListFailure,
  approveLeaveSuccess,
  rejectLeaveSuccess,
  fetchEmpLeaveListSuccess,
} from '../slices/leaveSlice';

// Apply leave
export const applyLeave = (leaveData) => async (dispatch) => {
  dispatch(applyLeaveStart());
  try {
    const response = await axios.post('http://localhost:5000/api/employees/apply-leave', leaveData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
        },
      }
    ); // Use your backend endpoint
    dispatch(applyLeaveSuccess(response.data));
  } catch (error) {
    dispatch(applyLeaveFailure(error.message));
  }
};

// Cancel leave
export const cancelLeave = (leaveId) => async (dispatch) => {
  dispatch(cancelLeaveStart());
  try {
    const response = await axios.post('http://localhost:5000/api/employees/cancel-leave', { leaveId },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    dispatch(cancelLeaveSuccess(response.data));
  } catch (error) {
    dispatch(cancelLeaveFailure(error.message));
  }
};

// View leave list (admin only)
export const fetchLeaveList = () => async (dispatch) => {
  dispatch(fetchLeaveListStart());
  try {
    const response = await axios.get('http://localhost:5000/api/employees/leave-list',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    dispatch(fetchLeaveListSuccess(response.data));
  } catch (error) {
    dispatch(fetchLeaveListFailure(error.message));
  }
};

export const fetchEmpLeaveList = (userId) => async (dispatch) => {
  dispatch(fetchLeaveListStart());
  try {
    const response = await axios.get(`http://localhost:5000/api/employees/emp-leave-list/${userId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    dispatch(fetchEmpLeaveListSuccess(response.data));
  } catch (error) {
    dispatch(fetchLeaveListFailure(error.message));
  }
};

// Approve leave
export const approveLeave = (leaveId) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/employees/approve-leave/${leaveId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    dispatch(approveLeaveSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};

// Reject leave
export const rejectLeave = (leaveId) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/employees/reject-leave/${leaveId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    });
    dispatch(rejectLeaveSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};
