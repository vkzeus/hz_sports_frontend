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

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clientName: "",
    firstName: "",
    lastName: "",
    clientType: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    accessLevel: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };
 const handleSubmit=async ()=>{
//     try{
// const res=await axios.post(registerUrl,formData,{loginHeader})
//   if(res.hzStatus===200){
//     navigate('/login',{replace:true})
//   }
//     }catch(error){
//         console.log(error)
//     }
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
            label="Client Name"
            variant="outlined"
            fullWidth
            value={formData?.clientName || ""}
            onChange={handleChange("clientName")}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={formData?.firstName || ""}
            onChange={handleChange("firstName")}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formData?.lastName || ""}
            onChange={handleChange("lastName")}
          />
          <TextField
            label="Client Type"
            select
            variant="outlined"
            fullWidth
            value={formData?.clientType || ""}
            onChange={handleChange("clientType")}
          >
            <MenuItem value="operator">Operator</MenuItem>
            <MenuItem value="advertiser">Advertiser</MenuItem>
          </TextField>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={formData?.email || ""}
            onChange={handleChange("email")}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            type="tel"
            value={formData?.phoneNumber || ""}
            onChange={handleChange("phoneNumber")}
          />
          <TextField
            label="Access Level"
            select
            variant="outlined"
            fullWidth
            value={formData?.accessLevel || ""}
            onChange={handleChange("accessLevel")}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={formData?.password || ""}
            onChange={handleChange("password")}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            value={formData?.confirmPassword || ""}
            onChange={handleChange("confirmPassword")}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
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
