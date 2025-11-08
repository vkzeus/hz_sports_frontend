import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip,
  Alert as MuiAlert,
} from '@mui/material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import Alert from '../../components/common/Alert';
import { applyLeaveRequest } from '../../store/slices/studentSlice';

const StudentLeave = () => {
  const dispatch = useDispatch();
  const { leaveRequests, loading } = useSelector((state) => state.student);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ reason: '', startDate: '', endDate: '' });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Leave requests are managed in the component state for now

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ reason: '', startDate: '', endDate: '' });
  };

  const handleSubmit = () => {
    if (!formData.reason || !formData.startDate || !formData.endDate) {
      setAlert({ open: true, message: 'Please fill all fields', severity: 'error' });
      return;
    }
    dispatch(applyLeaveRequest(formData));
    setAlert({ open: true, message: 'Leave request submitted successfully', severity: 'success' });
    handleCloseDialog();
  };

  const columns = [
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
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ ...alert, open: false })}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Leave Requests
        </Typography>
        <Button variant="contained" onClick={handleOpenDialog} sx={{ backgroundColor: '#543098' }}>
          Apply for Leave
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        {leaveRequests.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No leave requests yet
          </Typography>
        ) : (
          <DataTable columns={columns} rows={leaveRequests} />
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Apply for Leave</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Reason"
            multiline
            rows={4}
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#543098' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default StudentLeave;

