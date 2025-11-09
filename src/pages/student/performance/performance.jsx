import React from "react";
import { Box, Typography } from "@mui/material";

const StudentPerformance = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        My Performance
      </Typography>
      <Typography variant="body1">Performance metrics will be displayed here.</Typography>
    </Box>
  );
};

export default StudentPerformance;

