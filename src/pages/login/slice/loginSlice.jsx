import { createSlice } from "@reduxjs/toolkit";
import { loginAsync, registerAsync } from "../saga/loginSaga";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login reducers
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(loginAsync.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.error = null;

  // ✅ Persist to localStorage here
  try {
    if (action.payload.token && action.payload.user) {
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          isAuthenticated: true,
          role: (action.payload.user.role || "student").toLowerCase(),
          name:
            action.payload.user.name ||
            action.payload.user.email ||
            "User",
        })
      );
    }
  } catch (e) {
    console.error("Failed to persist login data:", e);
  }
})

      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register reducers
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
