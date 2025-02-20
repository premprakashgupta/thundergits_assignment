import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAttendance } from '../../lib/slices/attendanceSlice';

const EmployeeDashboard = () => {
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.auth)
  // Mock data - you can replace this with actual API calls to fetch data
  const [presentCount, setPresentCount] = useState(0);
  const [isPresentToday, setIsPresentToday] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount (or use an API call here)
  useEffect(() => {
    // Simulate fetching current month's present count and today's status
    setTimeout(() => {
      setPresentCount(15); // Example present count for the month
      setIsPresentToday(false); // Example status (false means the user hasn't marked present today)
      setLoading(false);
    }, 1000);
  }, []);

  const handleMarkPresent = () => {
    // This function can be used to update the present status (either via an API call or state update)
    setIsPresentToday(true);
    const dateTime=new Date()
    dispatch(markAttendance({userId:user._id,punchTime:dateTime.toISOString()}))
    // Optionally, make an API call to mark the present status in the backend
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <div>
        <h3>Current Month Present Count: {presentCount}</h3>
        <h3>Today's Present Status: {isPresentToday ? 'Present' : 'Not Marked Present'}</h3>
        <button onClick={handleMarkPresent}>
          {isPresentToday ? 'Checkout' : 'Mark Checkin'}
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
