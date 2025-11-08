import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from '../slices/studentSlice';
import { studentAPI } from '../../utils/api';

function* handleFetchProfile() {
  try {
    const response = yield call(studentAPI.getProfile);
    yield put(fetchProfileSuccess(response.data));
  } catch (error) {
    yield put(fetchProfileFailure(error.message || 'Failed to fetch profile'));
  }
}

function* handleFetchAttendance() {
  try {
    const response = yield call(studentAPI.getAttendance);
    yield put(fetchAttendanceSuccess(response.data));
  } catch (error) {
    yield put(fetchAttendanceFailure(error.message || 'Failed to fetch attendance'));
  }
}

function* handleFetchPerformance() {
  try {
    const response = yield call(studentAPI.getPerformance);
    yield put(fetchPerformanceSuccess(response.data));
  } catch (error) {
    yield put(fetchPerformanceFailure(error.message || 'Failed to fetch performance'));
  }
}

function* handleApplyLeave(action) {
  try {
    const response = yield call(studentAPI.applyLeave, action.payload);
    yield put(applyLeaveSuccess(response.data));
  } catch (error) {
    yield put(applyLeaveFailure(error.message || 'Failed to apply leave'));
  }
}

export default function* studentSaga() {
  yield takeLatest(fetchProfileRequest.type, handleFetchProfile);
  yield takeLatest(fetchAttendanceRequest.type, handleFetchAttendance);
  yield takeLatest(fetchPerformanceRequest.type, handleFetchPerformance);
  yield takeLatest(applyLeaveRequest.type, handleApplyLeave);
}

