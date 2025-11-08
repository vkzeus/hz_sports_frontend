import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    reports: [],
    leaveBalances: [],
    loading: false,
    error: null,
  },
  reducers: {
    generateReportRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    generateReportSuccess: (state, action) => {
      state.loading = false;
      state.reports.push(action.payload);
    },
    generateReportFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchReportsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReportsSuccess: (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    },
    fetchReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchLeaveBalancesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLeaveBalancesSuccess: (state, action) => {
      state.loading = false;
      state.leaveBalances = action.payload;
    },
    fetchLeaveBalancesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateLeaveBalanceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateLeaveBalanceSuccess: (state, action) => {
      state.loading = false;
      const index = state.leaveBalances.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.leaveBalances[index].leaveBalance = action.payload.leaveBalance;
      }
    },
    updateLeaveBalanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  generateReportRequest,
  generateReportSuccess,
  generateReportFailure,
  fetchReportsRequest,
  fetchReportsSuccess,
  fetchReportsFailure,
  fetchLeaveBalancesRequest,
  fetchLeaveBalancesSuccess,
  fetchLeaveBalancesFailure,
  updateLeaveBalanceRequest,
  updateLeaveBalanceSuccess,
  updateLeaveBalanceFailure,
} = adminSlice.actions;

export default adminSlice.reducer;

