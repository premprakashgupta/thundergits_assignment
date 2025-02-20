import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Employee from './pages/admin/Employee';
import Leave from './pages/admin/Leave';
import Attendance from './pages/admin/Attendance';
import EmployeeLayout from './pages/employee/EmployeeLayout';
import EmpAttendance from './pages/employee/EmpAttendance';
import EmpLeave from './pages/employee/EmpLeave';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch({ type: 'app/init' });
  }, [dispatch]);

  // Define admin routes and employee routes
  const adminRoutes = [
    { path: '/admin/dashboard', element: <AdminDashboard /> },
    { path: '/admin/employee', element: <Employee/> },
    { path: '/admin/leave', element: <Leave/> },
    { path: '/admin/attendance', element: <Attendance/> },
    { path: '/admin/employee-detail/:id', element: <div>Employee Detaiil</div> },
    { path: '/admin/payroll', element: <div> Payroll  </div> },
    // Add all admin-specific routes here...
  ];

  const employeeRoutes = [
    { path: '/employee/dashboard', element: <EmployeeDashboard />  },
    { path: '/employee/profile', element: <div>Employee Profile</div> },
    { path: '/employee/attendance', element: <EmpAttendance/> },
    { path: '/employee/leave', element: <EmpLeave/> },
    { path: '/employee/payroll', element: <div>Employee Payroll</div> },
    // Add all employee-specific routes here...
  ];

  return (
    <div className="App w-screen">
      
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route exact path="/login" element={isAuthenticated ? (user?.role === 'admin' ? <AdminLayout> <AdminDashboard /> </AdminLayout>  : <EmployeeLayout><EmployeeDashboard /></EmployeeLayout>) : <Login />} />
          <Route exact path="/signup" element={isAuthenticated ? (user?.role === 'admin' ? <AdminLayout><AdminDashboard /></AdminLayout> : <EmployeeLayout><EmployeeDashboard /></EmployeeLayout>) : <Signup />} />

          {/* Admin Routes */}
          {isAuthenticated && user?.role === 'admin' && adminRoutes.map((route, index) => (
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

          {/* Employee Routes */}
          {isAuthenticated && user?.role === 'employee' && employeeRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute role={user?.role} requiredRole="employee">
                  <EmployeeLayout>
                  {route.element}

                  </EmployeeLayout>
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
