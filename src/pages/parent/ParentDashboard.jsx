import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Person, Assessment } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { fetchChildrenRequest, selectChild } from '../../store/slices/parentSlice';

const ParentDashboard = () => {
  const dispatch = useDispatch();
  const { children, selectedChild, loading } = useSelector((state) => state.parent);

  useEffect(() => {
    dispatch(fetchChildrenRequest());
  }, [dispatch]);

  const handleChildChange = (event) => {
    const child = children.find(c => c.id === parseInt(event.target.value));
    dispatch(selectChild(child));
  };

  if (loading) {
    return (
      <DashboardLayout role="Parent">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Parent">
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Parent Dashboard
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Select Child</InputLabel>
          <Select
            value={selectedChild?.id || ''}
            onChange={handleChildChange}
            label="Select Child"
          >
            {children.map((child) => (
              <MenuItem key={child.id} value={child.id}>
                {child.name} - {child.sport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {selectedChild && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ backgroundColor: '#543098', color: 'white' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {selectedChild.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {selectedChild.sport}
                    </Typography>
                  </Box>
                  <Box sx={{ fontSize: '3rem', opacity: 0.8 }}>
                    <Person />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ backgroundColor: '#432080', color: 'white' }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {selectedChild.enrollmentID}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Enrollment ID
                    </Typography>
                  </Box>
                  <Box sx={{ fontSize: '3rem', opacity: 0.8 }}>
                    <Assessment />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {!selectedChild && children.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary" align="center">
            Please select a child to view their information
          </Typography>
        </Paper>
      )}

      {children.length === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary" align="center">
            No children registered
          </Typography>
        </Paper>
      )}
    </DashboardLayout>
  );
};

export default ParentDashboard;

