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
  Alert as MuiAlert,
} from '@mui/material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import Alert from '../../components/common/Alert';
import { fetchStudentsRequest, markAttendanceRequest } from '../../store/slices/coachSlice';

const CoachAttendance = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.coach);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ studentId: '', date: '', status: 'Present' });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchStudentsRequest());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ studentId: '', date: '', status: 'Present' });
  };

  const handleSubmit = () => {
    if (!formData.studentId || !formData.date || !formData.status) {
      setAlert({ open: true, message: 'Please fill all fields', severity: 'error' });
      return;
    }
    dispatch(markAttendanceRequest(formData));
    setAlert({ open: true, message: 'Attendance marked successfully', severity: 'success' });
    handleCloseDialog();
  };

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
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Mark Attendance
        </Typography>
        <Button variant="contained" onClick={handleOpenDialog} sx={{ backgroundColor: '#543098' }}>
          Mark Attendance
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Select a student and date to mark attendance. You can mark students as Present, Absent, or Late.
        </Typography>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Mark Attendance</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Student</InputLabel>
            <Select
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              label="Student"
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name} - {student.sport}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="Present">Present</MenuItem>
              <MenuItem value="Absent">Absent</MenuItem>
              <MenuItem value="Late">Late</MenuItem>
            </Select>
          </FormControl>
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

export default CoachAttendance;

