import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress, Chip } from '@mui/material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import { fetchChildAttendanceRequest } from '../../store/slices/parentSlice';

const ParentAttendance = () => {
  const dispatch = useDispatch();
  const { selectedChild, childAttendance, loading } = useSelector((state) => state.parent);

  useEffect(() => {
    if (selectedChild) {
      dispatch(fetchChildAttendanceRequest(selectedChild.id));
    }
  }, [dispatch, selectedChild]);

  const columns = [
    { field: 'date', headerName: 'Date' },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (row) => (
        <Chip
          label={row.status}
          color={row.status === 'Present' ? 'success' : row.status === 'Late' ? 'warning' : 'error'}
          size="small"
        />
      ),
    },
  ];

  const presentCount = childAttendance.filter(a => a.status === 'Present').length;
  const totalCount = childAttendance.length;
  const attendanceRate = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <DashboardLayout role="Parent">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (!selectedChild) {
    return (
      <DashboardLayout role="Parent">
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            Please select a child from the dashboard to view attendance
          </Typography>
        </Paper>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Parent">
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        {selectedChild.name}'s Attendance
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body1">
          Total Sessions: {totalCount}
        </Typography>
        <Typography variant="body1">
          Present: {presentCount}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
          Attendance Rate: {attendanceRate}%
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        {childAttendance.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No attendance records available
          </Typography>
        ) : (
          <DataTable columns={columns} rows={childAttendance} />
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default ParentAttendance;

