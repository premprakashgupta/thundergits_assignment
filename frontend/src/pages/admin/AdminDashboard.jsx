import React from 'react';
import { FaUsers, FaRegCheckCircle, FaRegClock } from 'react-icons/fa'; // Importing some icons for visual appeal

const AdminDashboard = ({ totalEmployees, activeEmployees, presentToday }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-xl p-8 mb-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-3 gap-8">
        {/* Total Employees */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-4 rounded-full">
              <FaUsers className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Total Employees</p>
              <p className="text-lg">{totalEmployees}</p>
            </div>
          </div>
        </div>

        {/* Active Employees */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 p-4 rounded-full">
              <FaRegCheckCircle className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Active Employees</p>
              <p className="text-lg">{activeEmployees}</p>
            </div>
          </div>
        </div>

        {/* Employees Present Today */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-500 p-4 rounded-full">
              <FaRegClock className="text-white text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-semibold">Present Today</p>
              <p className="text-lg">{presentToday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
