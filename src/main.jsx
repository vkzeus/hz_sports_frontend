import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { AuthProvider } from "./auth/authProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./components/themeprovider/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
 
);
