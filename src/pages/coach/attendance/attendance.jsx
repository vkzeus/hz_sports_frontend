import React from "react";
import { Box, Typography } from "@mui/material";

const CoachAttendance = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Mark Attendance
      </Typography>
      <Typography variant="body1">Attendance marking interface will be displayed here.</Typography>
    </Box>
  );
};

export default CoachAttendance;

