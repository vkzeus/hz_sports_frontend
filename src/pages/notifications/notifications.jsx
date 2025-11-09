import React from "react";
import { Box, Typography } from "@mui/material";

const Notifications = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Notifications
      </Typography>
      <Typography variant="body1">Your notifications will be displayed here.</Typography>
    </Box>
  );
};

export default Notifications;

