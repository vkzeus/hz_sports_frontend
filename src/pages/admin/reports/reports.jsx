import React from "react";
import { Box, Typography } from "@mui/material";

const AdminReports = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Reports
      </Typography>
      <Typography variant="body1">Reports and analytics will be displayed here.</Typography>
    </Box>
  );
};

export default AdminReports;

