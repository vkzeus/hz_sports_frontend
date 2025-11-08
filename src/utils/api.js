// API utility with placeholder/mock data
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data generators
const generateMockStudents = () => [
  { id: 1, name: 'John Doe', email: 'john@example.com', sport: 'Football', enrollmentID: 'ENR001', attendance: 85, performance: 92 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', sport: 'Basketball', enrollmentID: 'ENR002', attendance: 90, performance: 88 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', sport: 'Tennis', enrollmentID: 'ENR003', attendance: 78, performance: 85 },
];

const generateMockAttendance = () => [
  { id: 1, date: '2024-01-15', status: 'Present', studentId: 1 },
  { id: 2, date: '2024-01-16', status: 'Present', studentId: 1 },
  { id: 3, date: '2024-01-17', status: 'Absent', studentId: 1 },
  { id: 4, date: '2024-01-18', status: 'Present', studentId: 1 },
  { id: 5, date: '2024-01-19', status: 'Late', studentId: 1 },
];

const generateMockPerformance = () => [
  { id: 1, date: '2024-01-15', skill: 'Dribbling', score: 85, notes: 'Good improvement' },
  { id: 2, date: '2024-01-20', skill: 'Shooting', score: 90, notes: 'Excellent form' },
  { id: 3, date: '2024-01-25', skill: 'Passing', score: 88, notes: 'Needs more practice' },
];

const generateMockLeaveRequests = () => [
  { id: 1, studentId: 1, studentName: 'John Doe', reason: 'Family emergency', startDate: '2024-02-01', endDate: '2024-02-03', status: 'Pending' },
  { id: 2, studentId: 2, studentName: 'Jane Smith', reason: 'Medical appointment', startDate: '2024-02-05', endDate: '2024-02-05', status: 'Approved' },
  { id: 3, studentId: 3, studentName: 'Mike Johnson', reason: 'Personal', startDate: '2024-02-10', endDate: '2024-02-12', status: 'Rejected' },
];

const generateMockReports = () => [
  { id: 1, type: 'Attendance Report', period: 'January 2024', generatedDate: '2024-02-01', totalStudents: 50, averageAttendance: 85 },
  { id: 2, type: 'Performance Report', period: 'January 2024', generatedDate: '2024-02-01', totalStudents: 50, averagePerformance: 88 },
  { id: 3, type: 'Leave Report', period: 'January 2024', generatedDate: '2024-02-01', totalRequests: 15, approved: 12, rejected: 3 },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Student APIs
export const studentAPI = {
  getProfile: async () => {
    await delay(500);
    return { data: { id: 1, name: 'John Doe', email: 'john@example.com', sport: 'Football', enrollmentID: 'ENR001' } };
  },
  getAttendance: async () => {
    await delay(500);
    return { data: generateMockAttendance() };
  },
  getPerformance: async () => {
    await delay(500);
    return { data: generateMockPerformance() };
  },
  applyLeave: async (leaveData) => {
    await delay(500);
    return { data: { ...leaveData, id: Date.now(), status: 'Pending' } };
  },
  uploadDocument: async (document) => {
    await delay(500);
    return { data: { id: Date.now(), filename: document.name, uploadedAt: new Date().toISOString() } };
  },
};

// Parent APIs
export const parentAPI = {
  getChildren: async () => {
    await delay(500);
    return { data: [{ id: 1, name: 'John Doe', sport: 'Football', enrollmentID: 'ENR001' }] };
  },
  getChildPerformance: async (childId) => {
    await delay(500);
    return { data: generateMockPerformance() };
  },
  getChildAttendance: async (childId) => {
    await delay(500);
    return { data: generateMockAttendance() };
  },
};

// Coach APIs
export const coachAPI = {
  getStudents: async () => {
    await delay(500);
    return { data: generateMockStudents() };
  },
  getLeaveRequests: async () => {
    await delay(500);
    return { data: generateMockLeaveRequests() };
  },
  approveLeave: async (leaveId) => {
    await delay(500);
    return { data: { id: leaveId, status: 'Approved' } };
  },
  rejectLeave: async (leaveId) => {
    await delay(500);
    return { data: { id: leaveId, status: 'Rejected' } };
  },
  markAttendance: async (attendanceData) => {
    await delay(500);
    return { data: { ...attendanceData, id: Date.now() } };
  },
};

// Admin APIs
export const adminAPI = {
  generateReport: async (reportType, period) => {
    await delay(500);
    return { data: { id: Date.now(), type: reportType, period, generatedAt: new Date().toISOString() } };
  },
  getReports: async () => {
    await delay(500);
    return { data: generateMockReports() };
  },
  getLeaveBalances: async () => {
    await delay(500);
    return { data: generateMockStudents().map(s => ({ ...s, leaveBalance: 10, used: 2, remaining: 8 })) };
  },
  updateLeaveBalance: async (studentId, balance) => {
    await delay(500);
    return { data: { id: studentId, leaveBalance: balance } };
  },
};

export default api;

