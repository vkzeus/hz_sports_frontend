import React from "react";
import { createRoot } from "react-dom/client";
import { Snackbar, Alert } from "@mui/material";

let root = null;
let container = null;

// Gradient background by severity
const getGradient = (severity) => {
  switch (severity) {
    case "success":
      return "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)"; // green
    case "error":
      return "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)"; // red
    case "warning":
      return "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"; // yellow/orange
    default:
      return "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"; // blue (info)
  }
};

const Toast = ({ open, message, severity, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={3000}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    onClose={onClose}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{
        width: "100%",
        background: getGradient(severity),
        color: "#fff",
        borderRadius: "12px",
        fontWeight: "bold",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        "& .MuiAlert-icon": { color: "#fff" },
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);

const show = ({ message = "", severity = "info" }) => {
  if (!container) {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  }

  const handleClose = () => {
    root.render(<></>);
  };

  root.render(
    <Toast open={true} message={message} severity={severity} onClose={handleClose} />
  );

  setTimeout(() => handleClose(), 3000);
};

export default { show };
