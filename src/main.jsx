import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import store from "./store/store";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import ProtectedRoute from "./utils/ProtectedRoute";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentPerformance from "./pages/student/StudentPerformance";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentLeave from "./pages/student/StudentLeave";

// Parent pages
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentPerformance from "./pages/parent/ParentPerformance";
import ParentAttendance from "./pages/parent/ParentAttendance";

// Coach pages
import CoachDashboard from "./pages/coach/CoachDashboard";
import CoachStudents from "./pages/coach/CoachStudents";
import CoachLeaveRequests from "./pages/coach/CoachLeaveRequests";
import CoachAttendance from "./pages/coach/CoachAttendance";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReports from "./pages/admin/AdminReports";
import AdminLeaveBalances from "./pages/admin/AdminLeaveBalances";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/performance"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentPerformance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/attendance"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/leave"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentLeave />
              </ProtectedRoute>
            }
          />

          {/* Parent Routes */}
          <Route
            path="/parent/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Parent']}>
                <ParentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/performance"
            element={
              <ProtectedRoute allowedRoles={['Parent']}>
                <ParentPerformance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/attendance"
            element={
              <ProtectedRoute allowedRoles={['Parent']}>
                <ParentAttendance />
              </ProtectedRoute>
            }
          />

          {/* Coach Routes */}
          <Route
            path="/coach/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Coach']}>
                <CoachDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach/students"
            element={
              <ProtectedRoute allowedRoles={['Coach']}>
                <CoachStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach/leave-requests"
            element={
              <ProtectedRoute allowedRoles={['Coach']}>
                <CoachLeaveRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coach/attendance"
            element={
              <ProtectedRoute allowedRoles={['Coach']}>
                <CoachAttendance />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leave-balances"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminLeaveBalances />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
