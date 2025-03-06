import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AddStudentForm from './pages/admin/AddStudentForm';


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch({ type: 'app/init' });
  }, [dispatch]);

  // Define admin routes and employee routes
  const studentRoutes = [
    
    { path: '/student', element: <AdminDashboard/> },
    { path: '/student/create', element: <AddStudentForm/> },
   
    
  ];


  return (
    <div className="App w-screen">
      
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route exact path="/login" element={isAuthenticated ?  <AdminLayout> <AdminDashboard /> </AdminLayout>  : <Login />} />
          <Route exact path="/signup" element={isAuthenticated ?  <AdminLayout><AdminDashboard /></AdminLayout> : <Signup />} />

          {/* Admin Routes */}
          {isAuthenticated &&  studentRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role={user?.role} requiredRole="admin">
                  <AdminLayout>
                  {route.element}

                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          ))}


          {/* Fallback route for unauthenticated users */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
