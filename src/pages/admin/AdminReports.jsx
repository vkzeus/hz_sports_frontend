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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import Alert from '../../components/common/Alert';
import { fetchReportsRequest, generateReportRequest } from '../../store/slices/adminSlice';

const AdminReports = () => {
  const dispatch = useDispatch();
  const { reports, loading } = useSelector((state) => state.admin);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ reportType: '', period: '' });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchReportsRequest());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ reportType: '', period: '' });
  };

  const handleSubmit = () => {
    if (!formData.reportType || !formData.period) {
      setAlert({ open: true, message: 'Please fill all fields', severity: 'error' });
      return;
    }
    dispatch(generateReportRequest(formData));
    setAlert({ open: true, message: 'Report generated successfully', severity: 'success' });
    handleCloseDialog();
  };

  const columns = [
    { field: 'type', headerName: 'Report Type' },
    { field: 'period', headerName: 'Period' },
    { field: 'generatedDate', headerName: 'Generated Date' },
    { field: 'totalStudents', headerName: 'Total Students' },
    { field: 'averageAttendance', headerName: 'Avg Attendance' },
    { field: 'averagePerformance', headerName: 'Avg Performance' },
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
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Reports
        </Typography>
        <Button variant="contained" onClick={handleOpenDialog} sx={{ backgroundColor: '#543098' }}>
          Generate Report
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        {reports.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No reports generated yet
          </Typography>
        ) : (
          <DataTable columns={columns} rows={reports} />
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Generate Report</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Report Type</InputLabel>
            <Select
              value={formData.reportType}
              onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
              label="Report Type"
            >
              <MenuItem value="Attendance Report">Attendance Report</MenuItem>
              <MenuItem value="Performance Report">Performance Report</MenuItem>
              <MenuItem value="Leave Report">Leave Report</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Period (e.g., January 2024)"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#543098' }}>
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminReports;

