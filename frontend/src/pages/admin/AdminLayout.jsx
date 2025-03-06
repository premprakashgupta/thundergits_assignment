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
      <div className="flex justify-start items-center mb-6">
      <NavLink
          to="/student"
          className={`rounded-md text-sm flex justify-center items-center mr-1 px-3 py-2 ${activeNav === "/student" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          students
        </NavLink>
        <NavLink
          to="/student/create"
          className={`rounded-md text-sm flex justify-center items-center mr-1 px-3 py-2 ${activeNav === "/student/create" ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition duration-300`}
        >
          create student
        </NavLink>
        
      </div>
      <button className='cursor-pointer text-sm flex justify-center items-center bg-red-500 p-1 rounded-md' onClick={()=>dispatch(logOutAsync(user?._id))} >signout</button>
      </div>

      {/* Render the children components */}
      {children}
    </div>
  );
};

export default AdminLayout;
