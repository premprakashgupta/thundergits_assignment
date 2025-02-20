import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';




const EmployeeLayout = ({children}) => {
 
  return (
    <div className="p-6">
      {/* Navigation Bar (NavLink for routing) */}
      <div className="flex space-x-4 mb-6">
        <NavLink
          to="/employee/dashboard"
          className="rounded-full px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
          activeClassName="bg-blue-600"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/employee/profile"
          className="rounded-full px-6 py-2 bg-gray-200 hover:bg-gray-300 transition duration-300"
          activeClassName="bg-gray-300"
        >
          Profile
        </NavLink>
        <NavLink
          to="/employee/attendance"
          className="rounded-full px-6 py-2 bg-gray-200 hover:bg-gray-300 transition duration-300"
          activeClassName="bg-gray-300"
        >
          Attendance
        </NavLink>
        <NavLink
          to="/employee/leave"
          className="rounded-full px-6 py-2 bg-gray-200 hover:bg-gray-300 transition duration-300"
          activeClassName="bg-gray-300"
        >
          Leave
        </NavLink>
        <NavLink
          to="/employee/payroll"
          className="rounded-full px-6 py-2 bg-gray-200 hover:bg-gray-300 transition duration-300"
          activeClassName="bg-gray-300"
        >
          Payroll
        </NavLink>
      </div>

     {children}
      
    </div>
  );
};

export default EmployeeLayout;
