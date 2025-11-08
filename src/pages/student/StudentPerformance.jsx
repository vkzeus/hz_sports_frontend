import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress, Chip } from '@mui/material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import { fetchPerformanceRequest } from '../../store/slices/studentSlice';

const StudentPerformance = () => {
  const dispatch = useDispatch();
  const { performance, loading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(fetchPerformanceRequest());
  }, [dispatch]);

  const columns = [
    { field: 'date', headerName: 'Date' },
    { field: 'skill', headerName: 'Skill' },
    {
      field: 'score',
      headerName: 'Score',
      renderCell: (row) => (
        <Chip
          label={`${row.score}%`}
          color={row.score >= 90 ? 'success' : row.score >= 75 ? 'warning' : 'error'}
          size="small"
        />
      ),
    },
    { field: 'notes', headerName: 'Notes' },
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
        Performance Records
      </Typography>

      <Paper sx={{ p: 3 }}>
        {performance.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No performance records available
          </Typography>
        ) : (
          <DataTable columns={columns} rows={performance} />
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default StudentPerformance;

