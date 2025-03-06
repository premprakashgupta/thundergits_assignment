import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { signupAsync } from '../lib/slices/auth.slice'

const Signup = () => {
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch=useDispatch()
  const {loading,user,error}=useSelector((state)=>state.auth)
  // console.log(loading)

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  })

  // Handle form submission
  const handleSubmit = (values) => {
   
      console.log("Submitting values: ", values); // Log the values to the console before making the request

      dispatch(signupAsync(values))
      if(!loading&& user){
        navigate("/login"); // Redirect to login page
      }
    
  };
  
  useEffect(()=>{
    console.error(error)
  },[error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up for MelodyVerse</h2>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '', terms: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4 flex items-center">
                <Field
                  type="checkbox"
                  name="terms"
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-sm">I accept the terms and conditions</label>
                <ErrorMessage name="terms" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="flex justify-between items-center">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">{loading ? <img src="./loading.gif" alt="" className='w-6 h-6' /> : "Sign Up"}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Signup
