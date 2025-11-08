import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress, Chip } from '@mui/material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import { fetchAttendanceRequest } from '../../store/slices/studentSlice';

const StudentAttendance = () => {
  const dispatch = useDispatch();
  const { attendance, loading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchAttendanceRequest());
  }, [dispatch]);

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

  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const totalCount = attendance.length;
  const attendanceRate = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : 0;

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
        Attendance Records
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
        {attendance.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No attendance records available
          </Typography>
        ) : (
          <DataTable columns={columns} rows={attendance} />
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default StudentAttendance;

