import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { People, Notifications, Person } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { fetchStudentsRequest, fetchLeaveRequestsRequest } from '../../store/slices/coachSlice';

const CoachDashboard = () => {
  const dispatch = useDispatch();
  const { students, leaveRequests, loading } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(fetchStudentsRequest());
    dispatch(fetchLeaveRequestsRequest());
  }, [dispatch]);

  const pendingLeaves = leaveRequests.filter(req => req.status === 'Pending').length;

  if (loading) {
    return (
      <DashboardLayout role="Coach">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Coach">
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Coach Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#543098', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {students.length}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Total Students
                  </Typography>
                </Box>
                <Box sx={{ fontSize: '3rem', opacity: 0.8 }}>
                  <People />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#432080', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {pendingLeaves}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Pending Leave Requests
                  </Typography>
                </Box>
                <Box sx={{ fontSize: '3rem', opacity: 0.8 }}>
                  <Notifications />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#543098', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {students.length > 0 ? (students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(0) : 0}%
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Average Attendance
                  </Typography>
                </Box>
                <Box sx={{ fontSize: '3rem', opacity: 0.8 }}>
                  <Person />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default CoachDashboard;

