import { Navigate } from 'react-router-dom';

// A higher-order component to protect routes based on the user's role
const ProtectedRoute = ({ role, requiredRole, children }) => {
  // If the user is not authenticated or doesn't have the required role, redirect to login
  if (!role || role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
