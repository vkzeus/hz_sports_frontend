import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const RoleRedirect = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth context to be ready
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");
      
      if (token && (user?.isAuthenticated || storedUser)) {
        setIsLoading(false);
      } else {
        // If no auth, wait a bit more then redirect to login
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    checkAuth();
  }, [user]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role?.toLowerCase();
  console.log("RoleRedirect - user role:", role, "user:", user);

  // Redirect based on role
  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (role === "coach") {
    return <Navigate to="/coach/dashboard" replace />;
  } else if (role === "parent") {
    return <Navigate to="/parent/dashboard" replace />;
  } else {
    // Default to student dashboard
    return <Navigate to="/student/dashboard" replace />;
  }
};

export default RoleRedirect;

