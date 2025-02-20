import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmpLeaveList, applyLeave, cancelLeave } from '../../lib/thunks/leaveThunk'; // Ensure you import your action

const EmpLeave = () => {
  const [leaveData, setLeaveData] = useState({
    from: '',
    to: '',
    status: 'pending',  // Assuming the initial status is pending
    leaveCount: 1,  // Adjust based on your requirements
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { employeeLeaveList } = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(fetchEmpLeaveList(user._id));
  }, [dispatch, user._id]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle leave request submission
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to apply leave with the current form data
    dispatch(applyLeave({ ...leaveData, userId: user._id }));
    // Optionally reset the form or close modal
    setLeaveData({ from: '', to: '', status: 'pending', leaveCount: 1 });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>

      {/* Leave Request Form */}
      <form onSubmit={handleLeaveSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">
            From Date:
          </label>
          <input
            type="date"
            id="from"
            name="from"
            value={leaveData.from}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">
            To Date:
          </label>
          <input
            type="date"
            id="to"
            name="to"
            value={leaveData.to}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="leaveCount" className="block text-sm font-medium text-gray-700">
            Leave Count:
          </label>
          <input
            type="number"
            id="leaveCount"
            name="leaveCount"
            value={leaveData.leaveCount}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        >
          Apply Leave
        </button>
      </form>

      {/* Display Existing Leave Requests */}
      <h3 className="text-xl font-semibold mb-4">Existing Leave Requests</h3>
      <ul>
        {employeeLeaveList.map((leave) => (
          <li key={leave._id} className="border-b py-2">
            {leave.from} - {leave.to}
            <div className="mt-2">
              
              <button
                onClick={() =>
                  dispatch( cancelLeave(leave._id ))
                }
                className="ml-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpLeave;
