import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "./saga/loginSaga";
import { useAuth } from "../../auth/auth";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: authUser, setUser } = useAuth();

  // Redux state
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    sport: "",
    enrollmentId: "",
    linkedStudentIds: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };

    // Clean irrelevant fields
    if (payload.role === "Parent") delete payload.sport;
    if (payload.role === "Coach" || payload.role === "Admin") {
      delete payload.enrollmentId;
      delete payload.linkedStudentIds;
    }

    dispatch(registerAsync({payload,navigate}));
  };

  // 🔹 Redirect after successful registration
  useEffect(() => {
    if (user && token && !loading) {
      console.log("Registration success:", user, token);

      const userRole = user.role || "Student";
      const userName = user.name || user.email;

      const authData = {
        isAuthenticated: true,
        role: userRole.toLowerCase(),
        name: userName,
      };

      // Set context + localStorage
      setUser(authData);
      localStorage.setItem("authUser", JSON.stringify(authData));
      localStorage.setItem("authToken", token);

      // Role-based navigation
      setTimeout(() => {
        switch (authData.role) {
          case "admin":
            navigate("/admin/dashboard", { replace: true });
            break;
          case "coach":
            navigate("/coach/dashboard", { replace: true });
            break;
          case "parent":
            navigate("/parent/dashboard", { replace: true });
            break;
          default:
            navigate("/student/dashboard", { replace: true });
        }
      }, 300);
    }
  }, [user, token, loading, navigate, setUser]);

  // 🔹 Dynamic fields by role
  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "Student":
        return (
          <>
            <TextField
              label="Sport"
              variant="outlined"
              fullWidth
              value={formData.sport}
              onChange={handleChange("sport")}
            />
            <TextField
              label="Enrollment ID"
              variant="outlined"
              fullWidth
              value={formData.enrollmentId}
              onChange={handleChange("enrollmentId")}
            />
          </>
        );

      case "Parent":
        return (
          <TextField
            label="Linked Student IDs (comma-separated)"
            variant="outlined"
            fullWidth
            value={formData.linkedStudentIds}
            onChange={handleChange("linkedStudentIds")}
          />
        );

      case "Coach":
        return (
          <TextField
            label="Sport"
            variant="outlined"
            fullWidth
            value={formData.sport}
            onChange={handleChange("sport")}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 10,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange("name")}
          />

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange("email")}
          />

          <TextField
            label="Select Role"
            select
            variant="outlined"
            fullWidth
            value={formData.role}
            onChange={handleChange("role")}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Parent">Parent</MenuItem>
            <MenuItem value="Coach">Coach</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>

          {renderRoleSpecificFields()}

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={formData.password}
            onChange={handleChange("password")}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            sx={{
              backgroundColor: "#543098",
              color: "white",
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "10px",
              height: "50px",
              "&:hover": {
                backgroundColor: "#432080",
              },
            }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#543098",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </span>
          </Typography>

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
