import React from "react";
import { Box, Typography } from "@mui/material";

const ParentAttendance = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Child Attendance
      </Typography>
      <Typography variant="body1">Your child's attendance records will be displayed here.</Typography>
    </Box>
  );
};

export default ParentAttendance;

