import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/login/slice/loginSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
