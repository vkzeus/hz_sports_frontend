import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress, Chip } from '@mui/material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import { fetchStudentsRequest } from '../../store/slices/coachSlice';

const CoachStudents = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(fetchStudentsRequest());
  }, [dispatch]);

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'sport', headerName: 'Sport' },
    { field: 'enrollmentID', headerName: 'Enrollment ID' },
    {
      field: 'attendance',
      headerName: 'Attendance',
      renderCell: (row) => (
        <Chip
          label={`${row.attendance}%`}
          color={row.attendance >= 80 ? 'success' : row.attendance >= 60 ? 'warning' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'performance',
      headerName: 'Performance',
      renderCell: (row) => (
        <Chip
          label={`${row.performance}%`}
          color={row.performance >= 85 ? 'success' : row.performance >= 70 ? 'warning' : 'error'}
          size="small"
        />
      ),
    },
  ];

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
        Student Roster
      </Typography>

      <Paper sx={{ p: 3 }}>
        {students.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No students assigned
          </Typography>
        ) : (
          <DataTable columns={columns} rows={students} />
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default CoachStudents;

