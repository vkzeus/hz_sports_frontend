// src/protectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/auth";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("authToken");

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user context is not loaded yet but token exists, allow access
  // (user context might be loading from localStorage)
  if (!user?.isAuthenticated && token) {
    // Wait a bit for auth context to load
    return children;
  }

  // If explicitly not authenticated, redirect
  if (user && !user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (role && user?.role?.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
