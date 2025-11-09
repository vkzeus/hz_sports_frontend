import React from "react";
import { Box, Typography } from "@mui/material";

const StudentDocuments = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Documents
      </Typography>
      <Typography variant="body1">Document management will be displayed here.</Typography>
    </Box>
  );
};

export default StudentDocuments;

