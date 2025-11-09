import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#543098", // Horizon purple
    },
    secondary: {
      main: "#42a5f5", // light blue
    },
    error: {
      main: "#c62828",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },

  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 13, // global base size (smaller)
    h6: {
      fontSize: "0.9rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "0.85rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "0.85rem",
    },
    body2: {
      fontSize: "0.8rem",
    },
    caption: {
      fontSize: "0.7rem",
    },
    button: {
      textTransform: "none",
      fontSize: "0.85rem",
    },
  },

  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "0.85rem",
          fontWeight: 500,
          color: "#444",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          boxShadow: "2px 0 10px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#333",
        },
      },
    },
  },
});

export default theme;
