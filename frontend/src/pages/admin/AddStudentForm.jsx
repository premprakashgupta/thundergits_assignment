import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiUpload } from "react-icons/fi";
import { createStudent } from "../../lib/slices/studentSlice";
import { useDispatch } from "react-redux";
import { faker } from '@faker-js/faker';

const AddStudentForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [sameAddress, setSameAddress] = useState(false);
  const dispatch = useDispatch();

  const generateFakeData = () => ({
    admissionNumber: Math.floor(100000 + Math.random() * 900000).toString(),
    rollNumber: faker.number.int({ min: 1, max: 100 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    class: `${faker.number.int({ min: 1, max: 12 })}th`,
    section: faker.string.alpha(1).toUpperCase(),
    session: `${faker.number.int({ min: 2020, max: 2025 })}-${faker.number.int({ min: 2026, max: 2030 })}`,
    dateOfBirth: faker.date.birthdate({ min: 5, max: 18, mode: "age" }).toISOString().split("T")[0],
    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
    permanentAddress: faker.location.streetAddress(),
    correspondenceAddress: faker.location.streetAddress(),
    contactNumber: faker.phone.number("##########"),
    alternateContactNumber: faker.phone.number("##########"),
    email: faker.internet.email(),
    nationality: faker.location.country(),
    religion: faker.helpers.arrayElement(["Hindu", "Muslim", "Christian", "Sikh", "Other"]),
    category: faker.helpers.arrayElement(["General", "OBC", "SC", "ST"]),
    dateOfAdmission: new Date().toISOString().split("T")[0],
    bloodGroup: faker.helpers.arrayElement(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
    fatherName: faker.person.fullName(),
    motherName: faker.person.fullName(),
    fatherOccupation: faker.person.jobTitle(),
    motherOccupation: faker.person.jobTitle(),
    aadharPart1: faker.number.int({ min: 1000, max: 9999 }).toString(),
    aadharPart2: faker.number.int({ min: 1000, max: 9999 }).toString(),
    aadharPart3: faker.number.int({ min: 1000, max: 9999 }).toString(),
  });

  const formik = useFormik({
    initialValues: generateFakeData(),
    validationSchema: Yup.object({
      admissionNumber: Yup.string().required("Required"),
      rollNumber: Yup.number().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      class: Yup.string().required("Required"),
      section: Yup.string().optional(),
      session: Yup.string().required("Required"),
      dateOfBirth: Yup.date().required("Required"),
      gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
      permanentAddress: Yup.string().required("Required"),
      correspondenceAddress: Yup.string().optional(),
      contactNumber: Yup.string().required("Required"),
      alternateContactNumber: Yup.string().optional(),
      email: Yup.string().email("Invalid email").optional(),
      nationality: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      dateOfAdmission: Yup.date().required("Required"),
      bloodGroup: Yup.string().optional(),
      fatherName: Yup.string().required("Required"),
      motherName: Yup.string().required("Required"),
      fatherOccupation: Yup.string().optional(),
      motherOccupation: Yup.string().optional(),
      studentPhoto: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);
      dispatch(createStudent(values));
    },
  });

  const handleFillForm = () => {
    formik.setValues(generateFakeData());
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      formik.setFieldValue("studentPhoto", imageUrl);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add Student</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Admission Details */}
        <div>
        <div><label htmlFor=""  className="font-medium ">Admission Number</label></div>
        <input type="text" className="input border-[1px] border-gray-300 p-1 rounded-md" {...formik.getFieldProps("admissionNumber")} disabled placeholder="Admission Number" />
        </div>
        <div>
          <div> <label htmlFor="" className="font-medium ">Roll Number</label> </div>
        <input type="number" {...formik.getFieldProps("rollNumber")} min={1} placeholder="Roll Number" className="input border-[1px] border-gray-300 p-1 rounded-md" />
        </div>
        <div>
        <div> <label htmlFor="" className="font-medium ">First Name</label> </div>
        <input type="text" {...formik.getFieldProps("firstName")} placeholder="First Name" className="input border-[1px] border-gray-300 p-1 rounded-md" />
        </div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Last Name</label> </div>
        <input type="text" {...formik.getFieldProps("lastName")} placeholder="Last Name" className="input border-[1px] border-gray-300 p-1 rounded-md" />
        </div>
        {/* Class & Section */}
        <div>
        <div> <label htmlFor="" className="font-medium ">Class</label> </div>
        <select {...formik.getFieldProps("class")} className="input border-[1px] border-gray-300 p-1 rounded-md">
          <option value="">Select Class</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={`${i + 1}th`}>{`${i + 1}th`}</option>
          ))}
        </select>
        </div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Section</label> </div>
        <input type="text" {...formik.getFieldProps("section")} placeholder="Section" className="input border-[1px] border-gray-300 p-1 rounded-md" />
        </div>
        {/* Session & DOB */}
        <div>
        <div> <label htmlFor="" className="font-medium ">Session</label> </div>
        <input type="text" {...formik.getFieldProps("session")} placeholder="Session" className="input border-[1px] border-gray-300 p-1 rounded-md" />
        </div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Date Of Birth</label> </div>
        <input type="date" {...formik.getFieldProps("dateOfBirth")} className="input border-[1px] border-gray-300 p-1 rounded-md" />
        </div>
        {/* Gender & Nationality */}
        <div>
        <div> <label htmlFor="" className="font-medium ">Gender</label> </div>
        <select {...formik.getFieldProps("gender")} className="input border-[1px] border-gray-300 p-1 rounded-md">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        </div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Nationality</label> </div>
        <input type="text" {...formik.getFieldProps("nationality")} placeholder="Nationality" className="input border-[1px] border-gray-300 p-1 rounded-md" />
          </div>
        {/* Addresses */}
        <div>
        <div> <label htmlFor="" className="font-medium ">Permanent Address</label> </div>
        <input type="text" {...formik.getFieldProps("permanentAddress")} placeholder="Permanent Address" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" checked={sameAddress} onChange={() => {
            setSameAddress(!sameAddress)}
            
            
        } />
          <label className="text-gray-700">Same as Permanent Address</label>
        </div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Corresponding Address</label> </div>
        <input type="text" {...formik.getFieldProps("correspondenceAddress")} placeholder="Correspondence Address" className="input border-[1px] border-gray-300 p-1 rounded-md" disabled={sameAddress} />
        </div>
        {/* Contact Details */}
        <div>
        <div> <label htmlFor="" className="font-medium ">Contact Number</label> </div>
        <input type="text" {...formik.getFieldProps("contactNumber")} placeholder="Contact Number" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Alternate Contact Number</label> </div>
        <input type="text" {...formik.getFieldProps("alternateContactNumber")} placeholder="Alternate Contact Number" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Email</label> </div>
        <input type="email" {...formik.getFieldProps("email")} placeholder="Email" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>

        {/* Category & Admission Date */}
        <div>
        <div> <label htmlFor="" className="font-medium ">Category</label> </div>
        <input type="text" {...formik.getFieldProps("category")} placeholder="Category" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Date Of Admission</label> </div>
        <input type="date" {...formik.getFieldProps("dateOfAdmission")} className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>

        {/* Parent Details */}
        <div>
        <div> <label htmlFor="" className="font-medium ">Father's Name</label> </div>
        <input type="text" {...formik.getFieldProps("fatherName")} placeholder="Father's Name" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        <div>
        <div> <label htmlFor="" className="font-medium ">Mother's NAme</label> </div>
        <input type="text" {...formik.getFieldProps("motherName")} placeholder="Mother's Name" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>

        {/* Aadhaar Number */}
        <div className="flex space-x-2">
          <input type="text" {...formik.getFieldProps("aadharPart1")} placeholder="XXXX" maxLength="4" className="input border-[1px] border-gray-300 p-1 rounded-md w-1/3" />
          <input type="text" {...formik.getFieldProps("aadharPart2")} placeholder="XXXX" maxLength="4" className="input border-[1px] border-gray-300 p-1 rounded-md w-1/3" />
          <input type="text" {...formik.getFieldProps("aadharPart3")} placeholder="XXXX" maxLength="4" className="input border-[1px] border-gray-300 p-1 rounded-md w-1/3" />
        </div>

        {/* Image Upload */}
        <label className="input border-[1px] border-gray-300 p-1 rounded-md cursor-pointer flex items-center space-x-2">
          <FiUpload className="text-gray-600" />
          <span>Upload Photo</span>
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full border" />}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4">
        Submit
      </button>
    </form>
  );
};

export default AddStudentForm;
