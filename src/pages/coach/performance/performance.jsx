import React from "react";
import { Box, Typography } from "@mui/material";

const CoachPerformance = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Performance Tracking
      </Typography>
      <Typography variant="body1">Performance tracking and analytics will be displayed here.</Typography>
    </Box>
  );
};

export default CoachPerformance;

