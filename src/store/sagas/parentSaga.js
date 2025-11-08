import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchChildrenRequest,
  fetchChildrenSuccess,
  fetchChildrenFailure,
  fetchChildPerformanceRequest,
  fetchChildPerformanceSuccess,
  fetchChildPerformanceFailure,
  fetchChildAttendanceRequest,
  fetchChildAttendanceSuccess,
  fetchChildAttendanceFailure,
} from '../slices/parentSlice';
import { parentAPI } from '../../utils/api';

function* handleFetchChildren() {
  try {
    const response = yield call(parentAPI.getChildren);
    yield put(fetchChildrenSuccess(response.data));
  } catch (error) {
    yield put(fetchChildrenFailure(error.message || 'Failed to fetch children'));
  }
}

function* handleFetchChildPerformance(action) {
  try {
    const response = yield call(parentAPI.getChildPerformance, action.payload);
    yield put(fetchChildPerformanceSuccess(response.data));
  } catch (error) {
    yield put(fetchChildPerformanceFailure(error.message || 'Failed to fetch child performance'));
  }
}

function* handleFetchChildAttendance(action) {
  try {
    const response = yield call(parentAPI.getChildAttendance, action.payload);
    yield put(fetchChildAttendanceSuccess(response.data));
  } catch (error) {
    yield put(fetchChildAttendanceFailure(error.message || 'Failed to fetch child attendance'));
  }
}

export default function* parentSaga() {
  yield takeLatest(fetchChildrenRequest.type, handleFetchChildren);
  yield takeLatest(fetchChildPerformanceRequest.type, handleFetchChildPerformance);
  yield takeLatest(fetchChildAttendanceRequest.type, handleFetchChildAttendance);
}

