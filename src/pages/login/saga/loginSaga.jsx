import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../api/loginApi";
import toast from "../../../components/toast/toast";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);

      const data = response.data; // your API response
      console.log("Login response:", data);

      // ✅ normalize it for Redux
      const userData = {
        user: {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
        token: data.token,
      };

      toast.show({ severity: "success", message: "Logged in Successfully!" });
      return userData;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);


// Async thunk for register
export const registerAsync = createAsyncThunk(
  "auth/register",
  async ({payload,navigate}, { rejectWithValue }) => {
    try {
      const response = await registerApi(payload);
      toast.show({ severity: "success", message: "Registration successful !" });
     navigate("/login")
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      return rejectWithValue(errorMessage);
    }
  }
);
