import React from 'react';
import { Alert as MuiAlert, Snackbar } from '@mui/material';

const Alert = ({ open, message, severity = 'info', onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <MuiAlert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

