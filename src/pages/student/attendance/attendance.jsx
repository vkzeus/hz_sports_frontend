import React from "react";
import { Box, Typography } from "@mui/material";

const StudentAttendance = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        My Attendance
      </Typography>
      <Typography variant="body1">Attendance records will be displayed here.</Typography>
    </Box>
  );
};

export default StudentAttendance;

