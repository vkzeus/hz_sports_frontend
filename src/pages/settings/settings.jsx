import React from "react";
import { Box, Typography } from "@mui/material";

const Settings = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Settings
      </Typography>
      <Typography variant="body1">Settings and preferences will be displayed here.</Typography>
    </Box>
  );
};

export default Settings;
