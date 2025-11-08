import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, Button, CircularProgress, Chip, Alert as MuiAlert } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import Alert from '../../components/common/Alert';
import { fetchLeaveRequestsRequest, approveLeaveRequest, rejectLeaveRequest } from '../../store/slices/coachSlice';

const CoachLeaveRequests = () => {
  const dispatch = useDispatch();
  const { leaveRequests, loading } = useSelector((state) => state.coach);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchLeaveRequestsRequest());
  }, [dispatch]);

  const handleApprove = (leaveId) => {
    dispatch(approveLeaveRequest(leaveId));
    setAlert({ open: true, message: 'Leave request approved', severity: 'success' });
  };

  const handleReject = (leaveId) => {
    dispatch(rejectLeaveRequest(leaveId));
    setAlert({ open: true, message: 'Leave request rejected', severity: 'success' });
  };

  const columns = [
    { field: 'studentName', headerName: 'Student' },
    { field: 'reason', headerName: 'Reason' },
    { field: 'startDate', headerName: 'Start Date' },
    { field: 'endDate', headerName: 'End Date' },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (row) => (
        <Chip
          label={row.status}
          color={row.status === 'Approved' ? 'success' : row.status === 'Rejected' ? 'error' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row) => (
        row.status === 'Pending' ? (
          <Box>
            <Button
              size="small"
              color="success"
              startIcon={<Check />}
              onClick={() => handleApprove(row.id)}
              sx={{ mr: 1 }}
            >
              Approve
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<Close />}
              onClick={() => handleReject(row.id)}
            >
              Reject
            </Button>
          </Box>
        ) : null
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
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ ...alert, open: false })}
      />
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Leave Requests
      </Typography>

      <Paper sx={{ p: 3 }}>
        {leaveRequests.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No leave requests
          </Typography>
        ) : (
          <DataTable columns={columns} rows={leaveRequests} />
        )}
      </Paper>
    </DashboardLayout>
  );
};

export default CoachLeaveRequests;

