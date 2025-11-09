import React from "react";
import { Box, Typography } from "@mui/material";

const CoachStudents = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        My Students
      </Typography>
      <Typography variant="body1">Student list and management will be displayed here.</Typography>
    </Box>
  );
};

export default CoachStudents;

