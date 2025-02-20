import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { approveLeave, fetchLeaveList, rejectLeave } from '../../lib/thunks/leaveThunk';

const Leave = () => {
    const leaveRequests = []; 
    const dispatch=useDispatch()
    const {leaveList}=useSelector(state=>state.leave)
    useEffect(()=>{
      dispatch(fetchLeaveList())
    },[])
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
        <ul>
          {leaveList.map(leave => (
            <li key={leave._id} className="border-b py-2">
              {leave.from} - {leave.to}
              <div className="mt-2">
                <button
                  onClick={() => dispatch( approveLeave(leave._id ))}
                  className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => dispatch(rejectLeave(leave._id))}
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default Leave