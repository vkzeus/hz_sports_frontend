import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { Person, Assessment, Event } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { fetchProfileRequest, fetchAttendanceRequest, fetchPerformanceRequest } from '../../store/slices/studentSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { profile, attendance, performance, loading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchProfileRequest());
    dispatch(fetchAttendanceRequest());
    dispatch(fetchPerformanceRequest());
  }, [dispatch]);

  const stats = [
    { title: 'Attendance Rate', value: `${attendance.length > 0 ? (attendance.filter(a => a.status === 'Present').length / attendance.length * 100).toFixed(0) : 0}%`, icon: <Person />, color: '#543098' },
    { title: 'Average Performance', value: `${performance.length > 0 ? (performance.reduce((sum, p) => sum + p.score, 0) / performance.length).toFixed(0) : 0}%`, icon: <Assessment />, color: '#432080' },
    { title: 'Total Sessions', value: attendance.length.toString(), icon: <Event />, color: '#543098' },
  ];

  if (loading) {
    return (
      <DashboardLayout role="Student">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Student">
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Welcome, {profile?.name || 'Student'}!
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: stat.color, color: 'white' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ fontSize: '3rem', opacity: 0.8 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{profile?.name || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Email</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{profile?.email || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Sport</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{profile?.sport || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">Enrollment ID</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{profile?.enrollmentID || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default StudentDashboard;

