// src/components/topbar/Topbar.jsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Tooltip } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../pages/login/slice/loginSlice";
import { useAuth } from "../../auth/auth";

const drawerWidth = 240;
const collapsedWidth = 70;

const Topbar = ({ open }) => {
  const { user, setUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setUser({ isAuthenticated: false, role: "", name: "" });
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: "#fff",
        borderRadius:"10px",
        borderTopLeftRadius:"0px",
        color: "#333",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: (theme) => theme.zIndex.drawer + 1, // ensure it's above sidebar
        ml: open ? `${drawerWidth}px` : `${collapsedWidth}px`, // shift right
        width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`, // shrink width
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "64px" }}>
        {/* Left: Live Time */}
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {time}
        </Typography>

        {/* Right: Notifications + User Info + Logout */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>

          {/* User Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "#543098", width: 36, height: 36 }}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user?.name || "User"}
              </Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                {user?.role || "Role"}
              </Typography>
            </Box>
          </Box>

          {/* Logout */}
          <Tooltip title="Logout">
            <IconButton color="error" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
