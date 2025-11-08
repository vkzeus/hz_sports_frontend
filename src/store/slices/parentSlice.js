import { createSlice } from '@reduxjs/toolkit';

const parentSlice = createSlice({
  name: 'parent',
  initialState: {
    children: [],
    selectedChild: null,
    childPerformance: [],
    childAttendance: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchChildrenRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchChildrenSuccess: (state, action) => {
      state.loading = false;
      state.children = action.payload;
    },
    fetchChildrenFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectChild: (state, action) => {
      state.selectedChild = action.payload;
    },
    fetchChildPerformanceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchChildPerformanceSuccess: (state, action) => {
      state.loading = false;
      state.childPerformance = action.payload;
    },
    fetchChildPerformanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchChildAttendanceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchChildAttendanceSuccess: (state, action) => {
      state.loading = false;
      state.childAttendance = action.payload;
    },
    fetchChildAttendanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchChildrenRequest,
  fetchChildrenSuccess,
  fetchChildrenFailure,
  selectChild,
  fetchChildPerformanceRequest,
  fetchChildPerformanceSuccess,
  fetchChildPerformanceFailure,
  fetchChildAttendanceRequest,
  fetchChildAttendanceSuccess,
  fetchChildAttendanceFailure,
} = parentSlice.actions;

export default parentSlice.reducer;

