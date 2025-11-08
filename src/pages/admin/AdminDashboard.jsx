import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { Assessment, People, Description } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { fetchReportsRequest, fetchLeaveBalancesRequest } from '../../store/slices/adminSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { reports, leaveBalances, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchReportsRequest());
    dispatch(fetchLeaveBalancesRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <DashboardLayout role="Admin">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Admin">
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#543098', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {reports.length}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Total Reports
                  </Typography>
                </Box>
                <Box sx={{ fontSize: '3rem', opacity: 0.8 }}>
                  <Assessment />
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
                    {leaveBalances.length}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Students with Leave Balance
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
          <Card sx={{ backgroundColor: '#543098', color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {reports.length > 0 ? reports[reports.length - 1].type : 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Latest Report
                  </Typography>
                </Box>
                <Box sx={{ fontSize: '3rem', opacity: 0.8 }}>
                  <Description />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default AdminDashboard;

