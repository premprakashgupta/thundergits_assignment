import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { logOutAsync } from '../../lib/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeLayout = ({ children }) => {
  const location = useLocation(); // Get the current location
  const [activeNav, setActiveNav] = useState(location.pathname);
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.auth)
  useEffect(() => {
    setActiveNav(location.pathname); // Update activeNav whenever the location changes
  }, [location]); // Re-run the effect when location changes
  
  return (
    <div className="p-6">
      {/* Navigation Bar (NavLink for routing) */}
      <div className='flex justify-between items-center'>
      <div className="flex space-x-4 mb-6">
        <NavLink
          to="/employee/dashboard"
          className={`rounded-full px-6 py-2 ${activeNav === "/employee/dashboard" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/employee/profile"
          className={`rounded-full px-6 py-2 ${activeNav === "/employee/profile" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Profile
        </NavLink>
        <NavLink
          to="/employee/attendance"
          className={`rounded-full px-6 py-2 ${activeNav === "/employee/attendance" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Attendance
        </NavLink>
        <NavLink
          to="/employee/leave"
          className={`rounded-full px-6 py-2 ${activeNav === "/employee/leave" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Leave
        </NavLink>
        <NavLink
          to="/employee/payroll"
          className={`rounded-full px-6 py-2 ${activeNav === "/employee/payroll" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Payroll
        </NavLink>
      </div>
      <button className='cursor-pointer' onClick={()=>dispatch(logOutAsync(user?._id))}>sign out</button>
      </div>

      {/* Render the children components */}
      {children}
    </div>
  );
};

export default EmployeeLayout;
