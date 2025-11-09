import React from "react";
import { Box, Typography } from "@mui/material";

const CoachLeave = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Leave Requests
      </Typography>
      <Typography variant="body1">Leave request management will be displayed here.</Typography>
    </Box>
  );
};

export default CoachLeave;

