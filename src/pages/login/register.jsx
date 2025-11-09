import React, { useState } from "react";
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
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerRequest } from "./slice/loginSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const [formData, setFormData] = useState({
     "role": "",
    "name": "",
    "email": "",
    "class": "",
    "sport": "",
    "enrollmentId": "",
    "password": ""
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };
 const handleSubmit= (e)=>{
  console.log(formData)
e.preventDefault();
const payload = {
  ...formData
}
dispatch(registerRequest(payload))
 }


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
            label="Sport"
            variant="outlined"
            fullWidth
            value={formData?.sport || ""}
            onChange={handleChange("sport")}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={formData?.name || ""}
            onChange={handleChange("name")}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={formData?.email || ""}
            onChange={handleChange("email")}
          />
          <TextField
            label="Client Type"
            select
            variant="outlined"
            fullWidth
            value={formData?.role || ""}
            onChange={handleChange("role")}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Coach">Coach</MenuItem>
            <MenuItem value="Coach">Parent</MenuItem>
          </TextField>
          {/* <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={formData?.email || ""}
            onChange={handleChange("email")}
          /> */}
          {/* <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            type="tel"
            value={formData?.phoneNumber || ""}
            onChange={handleChange("phoneNumber")}
          /> */}
          {/* <TextField
            label="Access Level"
            select
            variant="outlined"
            fullWidth
            value={formData?.accessLevel || ""}
            onChange={handleChange("accessLevel")}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField> */}
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={formData?.enrollmentId || ""}
            onChange={handleChange("enrollmentId")}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={formData?.password || ""}
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
            Register
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
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
