import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendanceList } from '../../lib/slices/attendanceSlice';

const Attendance = () => {
  const dispatch=useDispatch()
  const {attendanceList}=useSelector(state=>state.attendance)
  // Sample attendance data for illustration
  const attendance = [
    {
      id: 1,
      employeeId: 'E001',
      checkin: '9:00 AM',
      checkout: '5:00 PM',
      duration: '8 hours',
      status: 'Present',
    },
    {
      id: 2,
      employeeId: 'E002',
      checkin: '9:15 AM',
      checkout: '5:00 PM',
      duration: '7 hours 45 minutes',
      status: 'Present',
    },
    {
      id: 3,
      employeeId: 'E003',
      checkin: '9:30 AM',
      checkout: '5:00 PM',
      duration: '7 hours 30 minutes',
      status: 'Absent',
    },
    // Add more attendance entries as required
  ];

  useEffect(()=>{
    dispatch(fetchAttendanceList())
  },[])

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Attendance Today</h2>
      <div className="overflow-y-auto max-h-[400px]">
        <ul>
          {attendanceList.map((att) => (
            <li
              key={att._id}
              className="flex justify-between items-center py-4 border-b border-gray-300 hover:bg-gray-100 transition duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="text-lg font-medium">{att._id}</div>
                <div className="text-sm text-gray-500">{att.checkin}</div>
                <div className="text-sm text-gray-500">{att.checkout}</div>
              </div>
              <div className="text-sm text-gray-600">{att.duration}</div>
              <div
                className={`text-sm font-semibold ${
                  att.present  ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {att.present? "Present":"Absent"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Attendance;
