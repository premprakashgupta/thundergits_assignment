import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '../lib/slices/auth.slice'

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false)
  const [initialValues, setInitialValues] = useState({ email: '', password: '' })
  const { loading, user, error, message } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(5, 'Password must be at least 6 characters').required('Password is required'),
  })

  // Handle form submission
  const handleSubmit = async (values) => {
    if (rememberMe) {
      localStorage.setItem('credentials', JSON.stringify({ email: values.email, password: values.password }))
    }else{
      localStorage.removeItem('credentials')
    }
    dispatch(loginAsync(values))
   
  }

  // Load saved credentials from localStorage if 'Remember Me' was checked
  useEffect(() => {
    const savedCredentials = JSON.parse(localStorage.getItem('credentials'))

    if (savedCredentials && savedCredentials.email && savedCredentials.password) {
      setInitialValues(savedCredentials)
      setRememberMe(true)
    }
  }, [])

  useEffect(() => {
    if (message) {
      console.info(message)
      navigate("/login")
    }
    console.log(error)
  }, [error,message])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to MelodyVerse</h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                  onChange={(e) => setFieldValue('email', e.target.value)}
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                  onChange={(e) => setFieldValue('password', e.target.value)}
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)} // No form reset here
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
              </div>

              <div className="flex justify-between items-center">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                  {loading ? <img src="./loading.gif" alt="" className='w-6 h-6' /> : "Login"}
                </button>
                <Link to="/forgot-password" className="text-sm text-blue-600">Forgot Password?</Link>
              </div>

              <div className='flex justify-center items-center'>
                <Link className='text-sm' to="/signup">New User? <span className='text-blue-400'>Signup</span> </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
