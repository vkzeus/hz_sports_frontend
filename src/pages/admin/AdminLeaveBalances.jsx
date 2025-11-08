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
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import Alert from '../../components/common/Alert';
import { fetchLeaveBalancesRequest, updateLeaveBalanceRequest } from '../../store/slices/adminSlice';

const AdminLeaveBalances = () => {
  const dispatch = useDispatch();
  const { leaveBalances, loading } = useSelector((state) => state.admin);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [balance, setBalance] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchLeaveBalancesRequest());
  }, [dispatch]);

  const handleOpenDialog = (student) => {
    setSelectedStudent(student);
    setBalance(student.leaveBalance.toString());
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
    setBalance('');
  };

  const handleSubmit = () => {
    if (!balance || isNaN(balance)) {
      setAlert({ open: true, message: 'Please enter a valid balance', severity: 'error' });
      return;
    }
    dispatch(updateLeaveBalanceRequest({ studentId: selectedStudent.id, balance: parseInt(balance) }));
    setAlert({ open: true, message: 'Leave balance updated successfully', severity: 'success' });
    handleCloseDialog();
  };

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'sport', headerName: 'Sport' },
    { field: 'enrollmentID', headerName: 'Enrollment ID' },
    { field: 'leaveBalance', headerName: 'Total Leave Balance' },
    { field: 'used', headerName: 'Used' },
    {
      field: 'remaining',
      headerName: 'Remaining',
      renderCell: (row) => (
        <Chip
          label={row.remaining}
          color={row.remaining > 5 ? 'success' : row.remaining > 2 ? 'warning' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (row) => (
        <Button
          size="small"
          startIcon={<Edit />}
          onClick={() => handleOpenDialog(row)}
          sx={{ color: '#543098' }}
        >
          Edit
        </Button>
      ),
    },
  ];

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
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ ...alert, open: false })}
      />
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Leave Balance Management
      </Typography>

      <Paper sx={{ p: 3 }}>
        {leaveBalances.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No leave balance records available
          </Typography>
        ) : (
          <DataTable columns={columns} rows={leaveBalances} />
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Update Leave Balance</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Student: {selectedStudent.name}
              </Typography>
              <TextField
                fullWidth
                label="Leave Balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#543098' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminLeaveBalances;

