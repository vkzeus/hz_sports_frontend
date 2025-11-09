import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const CoachDashboard = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 4 }}>
        Coach Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Welcome!</Typography>
              <Typography variant="body2" color="text.secondary">
                This is your coach dashboard.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoachDashboard;

