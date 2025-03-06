import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineClose } from "react-icons/md";
import { createStudent, updateStudent } from "../../lib/slices/studentSlice";
import { useDispatch } from "react-redux";
import { faker } from '@faker-js/faker';
import { FaCross } from "react-icons/fa";
import AadharInput from "../../components/AadharInput";
import { FiUpload } from "react-icons/fi";


const UploadStudentForm = ({data,setOpen}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null)
  const [sameAddress, setSameAddress] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    admissionNumber: data.admissionNumber,
    rollNumber: data.admissionNumber,
    firstName: data.firstName,
    lastName: data.lastName,
    class: data.class,
    section: data.section,
    session: data.session,
    dateOfBirth: data.admissionNumber,
    gender: data.gender,
    permanentAddress: data.permanentAddress,
    correspondenceAddress: data.correspondenceAddress,
    contactNumber: data.contactNumber,
    alternateContactNumber: data.alternateContactNumber,
    email: data.email,
    nationality: data.nationality,
    religion: data.admissionNumber,
    category: data.category,
    dateOfAdmission: data.dateOfAdmission,
    bloodGroup: data.bloodGroup,
    fatherName: data.fatherName,
    motherName: data.motherName,
    fatherOccupation: data.fatherOccupation,
    motherOccupation: data.motherOccupation,
    aadharPart1: data?.aadhaarNumber?.splice(0,3)||'',
    aadharPart2: data?.aadhaarNumber?.splice(4,7)|| '',
    aadharPart3: data?.aadhaarNumber?.splice(8,11)|| '',
  }


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      admissionNumber: Yup.string().required("Admission Number is Required"),
      rollNumber: Yup.number().required("Roll Number is Required"),
      firstName: Yup.string().required("First Name is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      class: Yup.string().required("Class is Required"),
      section: Yup.string().optional(),
      session: Yup.string().required("Session is Required"),
      dateOfBirth: Yup.date().required("Required"),
      gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Required"),
      permanentAddress: Yup.string().required("Permannent Address is Required"),
      correspondenceAddress: Yup.string().optional(),
      contactNumber: Yup.string().required("Contact Number is Required"),
      alternateContactNumber: Yup.string().optional(),
      email: Yup.string().email("Invalid email").optional(),
      nationality: Yup.string().required("Nationality is Required"),
      religion: Yup.string().optional(),
      category: Yup.string().required("Category is Required"),
      dateOfAdmission: Yup.date().required("Date of Admission is Required"),
      bloodGroup: Yup.string().optional(),
      fatherName: Yup.string().required("Father Name is Required"),
      motherName: Yup.string().required("Mother Name is Required"),
      fatherOccupation: Yup.string().optional(),
      motherOccupation: Yup.string().optional(),
      studentPhoto: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      
      const formData = new FormData();
  
      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          const element = values[key];
          formData.append(
            key,
            typeof element === "object" ? JSON.stringify(element) : element
          );
        }
      }
      if(data._id){
        formData.append("_id", data._id);
      }
      if (file) {
        formData.append("studentPhoto", file);
      }
  
      dispatch(updateStudent(formData));
      setOpen(false)
    },
  });
  

  const handleFillForm = (e) => {
    e.preventDefault()
    formik.setValues(generateFakeData());
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 p-4 overflow-y-auto">
      <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 ">
      <div className="flex justify-center items-center relative">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Upload Student</h2>
        <button onClick={()=>setOpen(false)} className="absolute top-0 right-0 cursor-pointer "><MdOutlineClose /></button>

      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Admission Details */}
        <div>
          <div><label htmlFor="" className="font-medium ">Admission Number</label></div>
          <input type="text" className="input border-[1px] border-gray-300 p-1 rounded-md" {...formik.getFieldProps("admissionNumber")} disabled placeholder="Admission Number" />
        </div>
        <div>
          <div> <label htmlFor="" className="font-medium ">Roll Number</label> </div>
          <input type="number" {...formik.getFieldProps("rollNumber")} min={1} placeholder="Roll Number" className="input border-[1px] border-gray-300 p-1 rounded-md" />
          {formik.touched.rollNumber && formik.errors.rollNumber && <div className="text-red-500">{formik.errors.rollNumber}</div>}
        </div>
        <div>
          <div> <label htmlFor="" className="font-medium ">First Name</label> </div>
          <input type="text" {...formik.getFieldProps("firstName")} placeholder="First Name" className="input border-[1px] border-gray-300 p-1 rounded-md" />
          {formik.touched.firstName && formik.errors.firstName && <div className="text-red-500">{formik.errors.firstName}</div>}
        </div>
        <div>
          <div> <label htmlFor="" className="font-medium ">Last Name</label> </div>
          <input type="text" {...formik.getFieldProps("lastName")} placeholder="Last Name" className="input border-[1px] border-gray-300 p-1 rounded-md" />
          {formik.touched.lastName && formik.errors.lastName && <div className="text-red-500">{formik.errors.lastName}</div>}
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
          {formik.touched.class && formik.errors.class && <div className="text-red-500">{formik.errors.class}</div>}
        </div>
        <div>
          <div> <label htmlFor="" className="font-medium ">Section</label> </div>
          <input type="text" {...formik.getFieldProps("section")} placeholder="Section" className="input border-[1px] border-gray-300 p-1 rounded-md" />
          {formik.touched.section && formik.errors.section && <div className="text-red-500">{formik.errors.section}</div>}
        </div>
        {/* Session & DOB */}
        <div>
          <div> <label htmlFor="" className="font-medium ">Session</label> </div>
          <input type="text" {...formik.getFieldProps("session")} placeholder="Session" className="input border-[1px] border-gray-300 p-1 rounded-md" />
          {formik.touched.section && formik.errors.section && <div className="text-red-500">{formik.errors.section}</div>}
        </div>
        <div>
          <div> <label htmlFor="" className="font-medium ">Date Of Birth</label> </div>
          <input type="date" {...formik.getFieldProps("dateOfBirth")} className="input border-[1px] border-gray-300 p-1 rounded-md" />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && <div className="text-red-500">{formik.errors.dateOfBirth}</div>}
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
          {formik.touched.gender && formik.errors.gender && <div className="text-red-500">{formik.errors.gender}</div>}
        </div>
        <div>
          <div> <label htmlFor="" className="font-medium ">Nationality</label> </div>
          <input type="text" {...formik.getFieldProps("nationality")} placeholder="Nationality" className="input border-[1px] border-gray-300 p-1 rounded-md" />
          {formik.touched.nationality && formik.errors.nationality && <div className="text-red-500">{formik.errors.nationality}</div>}
        </div>
        {/* Addresses */}
        <div>
          <div> <label htmlFor="" className="font-medium ">Permanent Address</label> </div>
          <input type="text" {...formik.getFieldProps("permanentAddress")} placeholder="Permanent Address" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        {formik.touched.permanentAddress && formik.errors.permanentAddress && <div className="text-red-500">{formik.errors.permanentAddress}</div>}
        <div className="flex items-center space-x-2">
          <input type="checkbox" checked={sameAddress} onChange={() => {
            setSameAddress(!sameAddress)
          }


          } />
          <label className="text-gray-700">Same as Permanent Address</label>
        </div>
        <div>
          <div> <label htmlFor="" className="font-medium ">Corresponding Address</label> </div>
          <input type="text" {...formik.getFieldProps("correspondenceAddress")} placeholder="Correspondence Address" className="input border-[1px] border-gray-300 p-1 rounded-md" disabled={sameAddress} />
          {formik.touched.correspondenceAddress && formik.errors.correspondenceAddress && <div className="text-red-500">{formik.errors.correspondenceAddress}</div>}
        </div>
        {/* Contact Details */}
        <div>
          <div> <label htmlFor="" className="font-medium ">Contact Number</label> </div>
          <input type="text" {...formik.getFieldProps("contactNumber")} placeholder="Contact Number" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        {formik.touched.contactNumber && formik.errors.contactNumber && <div className="text-red-500">{formik.errors.contactNumber}</div>}
        <div>
          <div> <label htmlFor="" className="font-medium ">Alternate Contact Number</label> </div>
          <input type="text" {...formik.getFieldProps("alternateContactNumber")} placeholder="Alternate Contact Number" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        {formik.touched.alternateContactNumber && formik.errors.alternateContactNumber && <div className="text-red-500">{formik.errors.alternateContactNumber}</div>}
        <div>
          <div> <label htmlFor="" className="font-medium ">Email</label> </div>
          <input type="email" {...formik.getFieldProps("email")} placeholder="Email" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        {formik.touched.email && formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
        {/* Category & Admission Date */}
        <div>
          <div> <label htmlFor="" className="font-medium ">Category</label> </div>
          <input type="text" {...formik.getFieldProps("category")} placeholder="Category" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        {formik.touched.category && formik.errors.category && <div className="text-red-500">{formik.errors.category}</div>}
        <div>
          <div> <label htmlFor="" className="font-medium ">Date Of Admission</label> </div>
          <input type="date" {...formik.getFieldProps("dateOfAdmission")} className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        {formik.touched.dateOfAdmission && formik.errors.dateOfAdmission && <div className="text-red-500">{formik.errors.dateOfAdmission}</div>}
        {/* Parent Details */}
        <div>
          <div> <label htmlFor="" className="font-medium ">Father's Name</label> </div>
          <input type="text" {...formik.getFieldProps("fatherName")} placeholder="Father's Name" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        {formik.touched.fatherName && formik.errors.fatherName && <div className="text-red-500">{formik.errors.fatherName}</div>}
        <div>
          <div> <label htmlFor="" className="font-medium ">Mother's NAme</label> </div>
          <input type="text" {...formik.getFieldProps("motherName")} placeholder="Mother's Name" className="input border-[1px] border-gray-300 p-1 rounded-md" /></div>
        {formik.touched.motherName && formik.errors.motherName && <div className="text-red-500">{formik.errors.motherName}</div>}
        {/* Aadhaar Number */}
        <div className="flex space-x-2">
          <AadharInput formik={formik}/>
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
    </div>
  );
};

export default UploadStudentForm;
