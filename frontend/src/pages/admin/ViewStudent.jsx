import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../../lib/slices/studentSlice";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UploadStudentForm from "./UploadStudentForm";

const ViewStudent = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [editData, setEditData] = useState(null)
  const [open, setOpen] = useState(false)
  const { students } = useSelector((state) => state.student);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 h-screen relative">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Student List
      </h2>

      {/* Search Input */}
      <div className="mb-4 flex items-center bg-gray-100 p-2 rounded-lg shadow-sm">
        <FiSearch className="text-gray-500 mx-3" />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full p-3 text-gray-700 bg-transparent focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6 hidden md:table-cell">Email</th>
              <th className="py-4 px-6">Phone</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-4 px-6">{student.firstName} {student.lastName}</td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    {student.email || "N/A"}
                  </td>
                  <td className="py-4 px-6">{student.phone || "N/A"}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      className="flex items-center text-blue-600 hover:text-blue-800 transition"
                      onClick={() => {
                        setEditData(student)
                        setOpen(true)
                      }}
                    >
                      <FiEdit className="mr-1" />
                      Edit
                    </button>
                    <button
                      className="flex items-center text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDelete(student._id)}
                    >
                      <FiTrash2 className="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     {open && <UploadStudentForm data={editData} setOpen={setOpen} />}
    </div>
  );
};

export default ViewStudent;
