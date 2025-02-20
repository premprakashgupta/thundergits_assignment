import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAttendance } from '../../lib/slices/attendanceSlice';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
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
    const dateTime = new Date();
    dispatch(markAttendance({ userId: user._id, punchTime: dateTime.toISOString() }));
    // Optionally, make an API call to mark the present status in the backend
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Employee Dashboard</h2>
      
      <div className="text-center mb-6">
        <h3 className="text-xl text-gray-700 mb-2">Current Month Present Count: 
          <span className="font-semibold text-blue-600">{presentCount}</span>
        </h3>
        <h3 className="text-xl text-gray-700">Today's Present Status: 
          <span className={`font-semibold ${isPresentToday ? 'text-green-600' : 'text-red-600'}`}>
            {isPresentToday ? 'Present' : 'Not Marked Present'}
          </span>
        </h3>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleMarkPresent}
          className={`px-6 py-3 text-white font-semibold rounded-lg transition duration-300 
            ${isPresentToday ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isPresentToday ? 'Checkout' : 'Mark Checkin'}
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
