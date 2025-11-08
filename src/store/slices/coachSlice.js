import { createSlice } from '@reduxjs/toolkit';

const coachSlice = createSlice({
  name: 'coach',
  initialState: {
    students: [],
    leaveRequests: [],
    attendance: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStudentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    fetchStudentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchLeaveRequestsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLeaveRequestsSuccess: (state, action) => {
      state.loading = false;
      state.leaveRequests = action.payload;
    },
    fetchLeaveRequestsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    approveLeaveRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    approveLeaveSuccess: (state, action) => {
      state.loading = false;
      const index = state.leaveRequests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.leaveRequests[index].status = 'Approved';
      }
    },
    approveLeaveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    rejectLeaveRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    rejectLeaveSuccess: (state, action) => {
      state.loading = false;
      const index = state.leaveRequests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.leaveRequests[index].status = 'Rejected';
      }
    },
    rejectLeaveFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    markAttendanceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    markAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.attendance.push(action.payload);
    },
    markAttendanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStudentsRequest,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  fetchLeaveRequestsRequest,
  fetchLeaveRequestsSuccess,
  fetchLeaveRequestsFailure,
  approveLeaveRequest,
  approveLeaveSuccess,
  approveLeaveFailure,
  rejectLeaveRequest,
  rejectLeaveSuccess,
  rejectLeaveFailure,
  markAttendanceRequest,
  markAttendanceSuccess,
  markAttendanceFailure,
} = coachSlice.actions;

export default coachSlice.reducer;

