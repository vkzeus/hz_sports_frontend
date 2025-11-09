import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginRequest } from "./slice/loginSlice";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch=useDispatch()
    const navigate=useNavigate()

  const slides = [
    {
      img: "",
      caption: "Hello",
    },
    {
      img: "",
      caption: "Bye",
    },
    {
      img: "",
      caption: "Hello",
    },
  ];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);


  const handleLogin = async (e) => {
    e.preventDefault();
    const payload={
      email:email,
      password:password
    }
    dispatch(loginRequest(payload))
  };

  return (
 <div style={{ backgroundColor: "#c2c2c2ff", width: "100%", height: "100%" }}>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: {
            xs: "center",
            md: "center",
          },
          alignItems: "center",
          backgroundColor: "#c2c2c2ff",
          padding: 0,
          width:"100%",
          gap: "200px",
          flexWrap: "wrap",
        }}
      >
        {/* --- LOGIN PAPER --- */}
        <Paper
          elevation={10}
          sx={{
            width: { xs: "90%", sm: "400px" },
            p: 4,
            borderRadius: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
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
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{
                  color: "#543098",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Register
              </span>
            </Typography>
          </Box>
        </Paper>

        {/* --- SIMPLE CAROUSEL BESIDE LOGIN --- */}
        <Box
          sx={{
            width: { xs: "100%", sm: "400px" },
            height: "500px",
            position: "relative",
            overflow: "hidden",
            borderRadius: 3,
    display: {
      xs: "none", 
      sm: "block", 
    },
          }}
        >
          {/* Images */}
          {slides.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: 0,
                left: `${(index - currentSlide) * 100}%`,
                width: "100%",
                height: "100%",
                transition: "left 0.6s ease",
              }}
            >
              <img
                src={slide.img}
                alt={slide.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              {/* <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0 0 10px rgba(0,0,0,0.5)",
                }}
              >
                {slide.caption}
              </Typography> */}
            </Box>
          ))}

          {/* Controls */}
          <IconButton
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + slides.length) % slides.length
              )
            }
            sx={{
              position: "absolute",
              top: "50%",
              left: "0px",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.3)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            }}
          >
            <ArrowBackIos />
          </IconButton>

          <IconButton
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0px",
              transform: "translateY(-50%)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.3)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
