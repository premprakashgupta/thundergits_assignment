import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, deleteEmployeeById, fetchEmployees } from '../../lib/slices/employeeSlice';

// Modal Styles
Modal.setAppElement('#root');

const Employee = () => {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const { employees, loading, error } = useSelector(state => state.employee);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteEmployeeById(id));
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            designation: '',
            image: null, // Start as null since it's a file
            bankAcc: '',
            ifscCode: '',
            ctc: '',
            adhaar: '',
            pan: '',
            emergencyNumber: '',
            shift: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            name: Yup.string().required('Required'),
            designation: Yup.string().required('Required'),
            image: Yup.mixed().required('Image is required'),
            bankAcc: Yup.string().required('Required'),
            ifscCode: Yup.string().required('Required'),
            ctc: Yup.number().required('Required'),
            adhaar: Yup.string().required('Required'),
            pan: Yup.string().required('Required'),
            emergencyNumber: Yup.string().required('Required'),
            // shift: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values)
            // Handle file upload (e.g., upload to server and get the URL)
            const formData = new FormData();

            for (const key in values) {
                const element = values[key];
                formData.append(key, element)
            }

            console.log(...formData)

            // Dispatch your action here for adding employee (e.g., `dispatch(createEmployee(formData))`)
            // Make sure to modify the backend to handle the image properly
            dispatch(createEmployee(formData));
            closeModal();
        }
    });

    // Handle image file input change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            formik.setFieldValue('image', file);
            setImagePreview(URL.createObjectURL(file)); // Show image preview
        }
    };


    return (
        <div className="p-6 space-y-6">
            <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Employee List</h2>
                <button
                    onClick={openModal}
                    className="mb-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
                >
                    Add Employee
                </button>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600">
                                <th className="p-4 text-left font-medium">Name</th>
                                <th className="p-4 text-left font-medium">Designation</th>
                                <th className="p-4 text-left font-medium">Email</th>
                                <th className="p-4 text-left font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading && <div className="text-center text-xl font-semibold">Loading...</div>
                            }
                            {error && <div className="text-center text-red-600">{error}</div>}
                            {!loading && !error && employees.map(employee => (
                                <tr key={employee._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{employee.name}</td>
                                    <td className="p-4">{employee.designation}</td>
                                    <td className="p-4">{employee.email}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleDelete(employee._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for adding employee */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto"
                overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                {...formik.getFieldProps('email')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.email && formik.touched.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name:</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('name')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.name && formik.touched.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Designation:</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('designation')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.designation && formik.touched.designation && <div className="text-red-500 text-sm">{formik.errors.designation}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bank Account:</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('bankAcc')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.bankAcc && formik.touched.bankAcc && <div className="text-red-500 text-sm">{formik.errors.bankAcc}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">IFSC Code:</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('ifscCode')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.ifscCode && formik.touched.ifscCode && <div className="text-red-500 text-sm">{formik.errors.ifscCode}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CTC:</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('ctc')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.ctc && formik.touched.ctc && <div className="text-red-500 text-sm">{formik.errors.ctc}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Adhaar:</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('adhaar')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.adhaar && formik.touched.adhaar && <div className="text-red-500 text-sm">{formik.errors.adhaar}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">PAN:</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('pan')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.pan && formik.touched.pan && <div className="text-red-500 text-sm">{formik.errors.pan}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Emergency Number:</label>
                            <input
                                type="text"
                                {...formik.getFieldProps('emergencyNumber')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.emergencyNumber && formik.touched.emergencyNumber && <div className="text-red-500 text-sm">{formik.errors.emergencyNumber}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Shift:</label>
                            <select
                                {...formik.getFieldProps('shift')}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="morning">Morning</option>
                                <option value="afternoon">Afternoon</option>
                                <option value="night">Night</option>
                            </select>
                            {formik.errors.shift && formik.touched.shift && <div className="text-red-500 text-sm">{formik.errors.shift}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image:</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.errors.image && formik.touched.image && <div className="text-red-500 text-sm">{formik.errors.image}</div>}
                    </div>

                    {imagePreview && (
                        <div className="mt-4">
                            <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover rounded-lg" />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                    >
                        Add Employee
                    </button>
                </form>
            </Modal>

        </div>
    );
};

export default Employee;
