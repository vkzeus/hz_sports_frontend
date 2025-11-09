import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Toolbar,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import horizonLogo from "../../assets/react.svg";
import { useAuth } from "../../auth/auth";

const Sidebar = ({ open = true, toggleSidebar = () => {} }) => {
  const { user } = useAuth();
  const drawerWidth = 240;
  const collapsedWidth = 70;

  const menuConfig = {
    student: [
      { text: "Dashboard", icon: <span>🎯</span>, path: "/student/dashboard" },
      { text: "Attendance", icon: <span>📅</span>, path: "/student/attendance" },
      { text: "Performance", icon: <span>📈</span>, path: "/student/performance" },
      { text: "Leave", icon: <span>📝</span>, path: "/student/leave" },
      { text: "Documents", icon: <span>📂</span>, path: "/student/documents" },
    ],
    parent: [
      { text: "Dashboard", icon: <span>🏠</span>, path: "/parent/dashboard" },
      { text: "Child Attendance", icon: <span>📅</span>, path: "/parent/attendance" },
      { text: "Child Performance", icon: <span>📊</span>, path: "/parent/performance" },
      { text: "Leave Requests", icon: <span>📝</span>, path: "/parent/leave" },
    ],
    coach: [
      { text: "Dashboard", icon: <span>📋</span>, path: "/coach/dashboard" },
      { text: "My Students", icon: <span>🧑‍🎓</span>, path: "/coach/students" },
      { text: "Mark Attendance", icon: <span>✅</span>, path: "/coach/attendance" },
      { text: "Performance", icon: <span>📈</span>, path: "/coach/performance" },
      { text: "Leave Requests", icon: <span>📝</span>, path: "/coach/leave" },
    ],
    admin: [
      { text: "Dashboard", icon: <span>📊</span>, path: "/admin/dashboard" },
      { text: "Users", icon: <span>👥</span>, path: "/admin/users" },
      { text: "Attendance", icon: <span>📅</span>, path: "/admin/attendance" },
      { text: "Performance", icon: <span>📈</span>, path: "/admin/performance" },
      { text: "Leave Management", icon: <span>📝</span>, path: "/admin/leave" },
      { text: "Reports", icon: <span>📑</span>, path: "/admin/reports" },
    ],
  };

  const userRole = user?.role?.toLowerCase();
  const menuItems = menuConfig[userRole] || menuConfig.student;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s ease",
          boxSizing: "border-box",
          background: "white",
          borderRight: "none",
          boxShadow: "2px 0 10px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          minHeight: "64px !important",
          px: open ? 3 : 1,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <IconButton onClick={toggleSidebar}>
          <img src={horizonLogo} alt="Logo" style={{ width: "30px", height: "30px" }} />
        </IconButton>

        {open && (
          <Typography variant="h6" sx={{ ml: 2, fontWeight: 700, fontSize: "0.9rem" }}>
            Horizon Academy
          </Typography>
        )}
      </Toolbar>

      <Divider />

      <List sx={{ px: 1.2, mt: 4 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: "10px",
              px: open ? 2 : 0,
              py: 1,
              justifyContent: open ? "flex-start" : "center",
              color: "#555",
              fontWeight: 500,
              "&:hover": {
                background: "rgba(25,118,210,0.08)",
              },
              "&.active": {
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                color: "#fff",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: open ? 40 : "auto",
                mr: open ? 2 : 0,
                fontSize: "1.2rem",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
