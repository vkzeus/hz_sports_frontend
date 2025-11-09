import React from "react";
import { Box, Typography } from "@mui/material";

const AdminPerformance = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Performance Analytics
      </Typography>
      <Typography variant="body1">Performance analytics and reports will be displayed here.</Typography>
    </Box>
  );
};

export default AdminPerformance;

