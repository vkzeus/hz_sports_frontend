import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Person,
  People,
  SportsSoccer,
  Assessment,
  Notifications,
  Logout,
  AccountCircle,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure } from '../../pages/login/slice/loginSlice';

const drawerWidth = 240;

const DashboardLayout = ({ children, role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(loginFailure(null));
    navigate('/login');
  };

  // Menu items based on role
  const getMenuItems = () => {
    const baseItems = [
      { text: 'Dashboard', icon: <Dashboard />, path: `/${role.toLowerCase()}/dashboard` },
    ];

    if (role === 'Student') {
      return [
        ...baseItems,
        { text: 'Performance', icon: <Assessment />, path: '/student/performance' },
        { text: 'Attendance', icon: <Person />, path: '/student/attendance' },
        { text: 'Apply Leave', icon: <SportsSoccer />, path: '/student/leave' },
      ];
    }

    if (role === 'Parent') {
      return [
        ...baseItems,
        { text: 'Child Performance', icon: <Assessment />, path: '/parent/performance' },
        { text: 'Child Attendance', icon: <Person />, path: '/parent/attendance' },
      ];
    }

    if (role === 'Coach') {
      return [
        ...baseItems,
        { text: 'Students', icon: <People />, path: '/coach/students' },
        { text: 'Leave Requests', icon: <Notifications />, path: '/coach/leave-requests' },
        { text: 'Mark Attendance', icon: <Person />, path: '/coach/attendance' },
      ];
    }

    if (role === 'Admin') {
      return [
        ...baseItems,
        { text: 'Reports', icon: <Assessment />, path: '/admin/reports' },
        { text: 'Leave Balances', icon: <People />, path: '/admin/leave-balances' },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  const drawer = (
    <Box>
      <Toolbar sx={{ backgroundColor: '#543098', color: 'white' }}>
        <Typography variant="h6" noWrap component="div">
          Sports Academy
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#543098',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#432080',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'white' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#543098',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {role} Dashboard
          </Typography>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: '#432080' }}>
              {user?.name?.charAt(0) || <AccountCircle />}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={user?.name || 'User'} secondary={user?.email} />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;

