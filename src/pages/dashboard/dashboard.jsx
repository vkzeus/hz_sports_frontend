import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const Dashboard = () => {
  // Dummy data
  const stats = [
    { title: "Pending Approvals", value: 3 },
    { title: "Active Partners", value: 5 },
    { title: "Rejected / Inactive", value: 1 },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: "#333",mb:4 }} >
        Partner Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Analytics Section */}
      <Box mt={5}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Partner Analytics
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Analytics summary and insights will appear here.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
