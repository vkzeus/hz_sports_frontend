import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from '../slices/adminSlice';
import { adminAPI } from '../../utils/api';

function* handleGenerateReport(action) {
  try {
    const response = yield call(adminAPI.generateReport, action.payload.reportType, action.payload.period);
    yield put(generateReportSuccess(response.data));
  } catch (error) {
    yield put(generateReportFailure(error.message || 'Failed to generate report'));
  }
}

function* handleFetchReports() {
  try {
    const response = yield call(adminAPI.getReports);
    yield put(fetchReportsSuccess(response.data));
  } catch (error) {
    yield put(fetchReportsFailure(error.message || 'Failed to fetch reports'));
  }
}

function* handleFetchLeaveBalances() {
  try {
    const response = yield call(adminAPI.getLeaveBalances);
    yield put(fetchLeaveBalancesSuccess(response.data));
  } catch (error) {
    yield put(fetchLeaveBalancesFailure(error.message || 'Failed to fetch leave balances'));
  }
}

function* handleUpdateLeaveBalance(action) {
  try {
    const response = yield call(adminAPI.updateLeaveBalance, action.payload.studentId, action.payload.balance);
    yield put(updateLeaveBalanceSuccess(response.data));
  } catch (error) {
    yield put(updateLeaveBalanceFailure(error.message || 'Failed to update leave balance'));
  }
}

export default function* adminSaga() {
  yield takeLatest(generateReportRequest.type, handleGenerateReport);
  yield takeLatest(fetchReportsRequest.type, handleFetchReports);
  yield takeLatest(fetchLeaveBalancesRequest.type, handleFetchLeaveBalances);
  yield takeLatest(updateLeaveBalanceRequest.type, handleUpdateLeaveBalance);
}

