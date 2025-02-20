import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { logOutAsync } from '../../lib/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

const AdminLayout = ({ children }) => {
  const location = useLocation(); // Get current location
  const [activeNav, setActiveNav] = useState(location.pathname);
  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect(() => {
    setActiveNav(location.pathname); // Update activeNav when location changes
  }, [location]); // Re-run the effect when location changes
  
  return (
    <div className="p-6">
      {/* Navigation Bar (NavLink for routing) */}
      <div className='flex justify-between items-center'>
      <div className="flex space-x-4 mb-6">
        <NavLink
          to="/admin/dashboard"
          className={`rounded-full px-6 py-2 ${activeNav === "/admin/dashboard" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/employee"
          className={`rounded-full px-6 py-2 ${activeNav === "/admin/employee" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Employee
        </NavLink>
        <NavLink
          to="/admin/attendance"
          className={`rounded-full px-6 py-2 ${activeNav === "/admin/attendance" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Attendance
        </NavLink>
        <NavLink
          to="/admin/leave"
          className={`rounded-full px-6 py-2 ${activeNav === "/admin/leave" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Leave
        </NavLink>
        <NavLink
          to="/admin/payroll"
          className={`rounded-full px-6 py-2 ${activeNav === "/admin/payroll" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          Payroll
        </NavLink>
      </div>
      <button className='cursor-pointer' onClick={()=>dispatch(logOutAsync(user?._id))} >signout</button>
      </div>

      {/* Render the children components */}
      {children}
    </div>
  );
};

export default AdminLayout;
