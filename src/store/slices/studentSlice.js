import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    profile: null,
    attendance: [],
    performance: [],
    leaveRequests: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAttendanceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.attendance = action.payload;
    },
    fetchAttendanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPerformanceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPerformanceSuccess: (state, action) => {
      state.loading = false;
      state.performance = action.payload;
    },
    fetchPerformanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    applyLeaveRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    applyLeaveSuccess: (state, action) => {
      state.loading = false;
      state.leaveRequests.push(action.payload);
    },
    applyLeaveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  fetchAttendanceRequest,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  fetchPerformanceRequest,
  fetchPerformanceSuccess,
  fetchPerformanceFailure,
  applyLeaveRequest,
  applyLeaveSuccess,
  applyLeaveFailure,
} = studentSlice.actions;

export default studentSlice.reducer;

