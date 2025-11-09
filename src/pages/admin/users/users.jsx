import React from "react";
import { Box, Typography } from "@mui/material";

const AdminUsers = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        User Management
      </Typography>
      <Typography variant="body1">User management interface will be displayed here.</Typography>
    </Box>
  );
};

export default AdminUsers;

