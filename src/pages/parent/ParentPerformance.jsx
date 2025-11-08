import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress, Chip } from '@mui/material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import { fetchChildPerformanceRequest } from '../../store/slices/parentSlice';

const ParentPerformance = () => {
  const dispatch = useDispatch();
  const { selectedChild, childPerformance, loading } = useSelector((state) => state.parent);

  useEffect(() => {
    if (selectedChild) {
      dispatch(fetchChildPerformanceRequest(selectedChild.id));
    }
  }, [dispatch, selectedChild]);

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
            Please select a child from the dashboard to view performance
          </Typography>
        </Paper>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Parent">
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        {selectedChild.name}'s Performance
      </Typography>

      <Paper sx={{ p: 3 }}>
        {childPerformance.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No performance records available
          </Typography>
        ) : (
          <DataTable columns={columns} rows={childPerformance} />
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default ParentPerformance;

