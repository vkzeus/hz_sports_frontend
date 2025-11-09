import React from "react";
import { Box, Typography } from "@mui/material";

const ParentPerformance = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Child Performance
      </Typography>
      <Typography variant="body1">Your child's performance metrics will be displayed here.</Typography>
    </Box>
  );
};

export default ParentPerformance;

