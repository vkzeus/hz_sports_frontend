import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from '../slices/coachSlice';
import { coachAPI } from '../../utils/api';

function* handleFetchStudents() {
  try {
    const response = yield call(coachAPI.getStudents);
    yield put(fetchStudentsSuccess(response.data));
  } catch (error) {
    yield put(fetchStudentsFailure(error.message || 'Failed to fetch students'));
  }
}

function* handleFetchLeaveRequests() {
  try {
    const response = yield call(coachAPI.getLeaveRequests);
    yield put(fetchLeaveRequestsSuccess(response.data));
  } catch (error) {
    yield put(fetchLeaveRequestsFailure(error.message || 'Failed to fetch leave requests'));
  }
}

function* handleApproveLeave(action) {
  try {
    const response = yield call(coachAPI.approveLeave, action.payload);
    yield put(approveLeaveSuccess(response.data));
  } catch (error) {
    yield put(approveLeaveFailure(error.message || 'Failed to approve leave'));
  }
}

function* handleRejectLeave(action) {
  try {
    const response = yield call(coachAPI.rejectLeave, action.payload);
    yield put(rejectLeaveSuccess(response.data));
  } catch (error) {
    yield put(rejectLeaveFailure(error.message || 'Failed to reject leave'));
  }
}

function* handleMarkAttendance(action) {
  try {
    const response = yield call(coachAPI.markAttendance, action.payload);
    yield put(markAttendanceSuccess(response.data));
  } catch (error) {
    yield put(markAttendanceFailure(error.message || 'Failed to mark attendance'));
  }
}

export default function* coachSaga() {
  yield takeLatest(fetchStudentsRequest.type, handleFetchStudents);
  yield takeLatest(fetchLeaveRequestsRequest.type, handleFetchLeaveRequests);
  yield takeLatest(approveLeaveRequest.type, handleApproveLeave);
  yield takeLatest(rejectLeaveRequest.type, handleRejectLeave);
  yield takeLatest(markAttendanceRequest.type, handleMarkAttendance);
}

