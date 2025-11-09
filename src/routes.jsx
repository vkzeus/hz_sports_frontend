// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Layout from "./layout/layout";
// pages
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import Settings from "./pages/settings/settings";
import Notifications from "./pages/notifications/notifications";

// Student pages
import StudentDashboard from "./pages/student/dashboard/dashboard";
import StudentAttendance from "./pages/student/attendance/attendance";
import StudentPerformance from "./pages/student/performance/performance";
import StudentLeave from "./pages/student/leave/leave";
import StudentDocuments from "./pages/student/documents/documents";

// Parent pages
import ParentDashboard from "./pages/parent/dashboard/dashboard";
import ParentAttendance from "./pages/parent/attendance/attendance";
import ParentPerformance from "./pages/parent/performance/performance";
import ParentLeave from "./pages/parent/leave/leave";

// Coach pages
import CoachDashboard from "./pages/coach/dashboard/dashboard";
import CoachStudents from "./pages/coach/students/students";
import CoachAttendance from "./pages/coach/attendance/attendance";
import CoachPerformance from "./pages/coach/performance/performance";
import CoachLeave from "./pages/coach/leave/leave";

// Admin pages
import AdminDashboard from "./pages/admin/dashboard/dashboard";
import AdminUsers from "./pages/admin/users/users";
import AdminAttendance from "./pages/admin/attendance/attendance";
import AdminPerformance from "./pages/admin/performance/performance";
import AdminLeave from "./pages/admin/leave/leave";
import AdminReports from "./pages/admin/reports/reports";
import RoleRedirect from "./components/roleRedirect/roleRedirect";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      // Default route - redirects based on role
      { index: true, element: <ProtectedRoute><RoleRedirect /></ProtectedRoute> },
      
      // Shared routes
      { path: "notifications", element: <ProtectedRoute><Notifications /></ProtectedRoute> },
      { path: "settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },

      // Student routes
      { path: "student/dashboard", element: <ProtectedRoute><StudentDashboard /></ProtectedRoute> },
      { path: "student/attendance", element: <ProtectedRoute><StudentAttendance /></ProtectedRoute> },
      { path: "student/performance", element: <ProtectedRoute><StudentPerformance /></ProtectedRoute> },
      { path: "student/leave", element: <ProtectedRoute><StudentLeave /></ProtectedRoute> },
      { path: "student/documents", element: <ProtectedRoute><StudentDocuments /></ProtectedRoute> },

      // Parent routes
      { path: "parent/dashboard", element: <ProtectedRoute><ParentDashboard /></ProtectedRoute> },
      { path: "parent/attendance", element: <ProtectedRoute><ParentAttendance /></ProtectedRoute> },
      { path: "parent/performance", element: <ProtectedRoute><ParentPerformance /></ProtectedRoute> },
      { path: "parent/leave", element: <ProtectedRoute><ParentLeave /></ProtectedRoute> },

      // Coach routes
      { path: "coach/dashboard", element: <ProtectedRoute><CoachDashboard /></ProtectedRoute> },
      { path: "coach/students", element: <ProtectedRoute><CoachStudents /></ProtectedRoute> },
      { path: "coach/attendance", element: <ProtectedRoute><CoachAttendance /></ProtectedRoute> },
      { path: "coach/performance", element: <ProtectedRoute><CoachPerformance /></ProtectedRoute> },
      { path: "coach/leave", element: <ProtectedRoute><CoachLeave /></ProtectedRoute> },

      // Admin routes
      { path: "admin/dashboard", element: <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute> },
      { path: "admin/users", element: <ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute> },
      { path: "admin/attendance", element: <ProtectedRoute role="admin"><AdminAttendance /></ProtectedRoute> },
      { path: "admin/performance", element: <ProtectedRoute role="admin"><AdminPerformance /></ProtectedRoute> },
      { path: "admin/leave", element: <ProtectedRoute role="admin"><AdminLeave /></ProtectedRoute> },
      { path: "admin/reports", element: <ProtectedRoute role="admin"><AdminReports /></ProtectedRoute> },
    ],
  },
]);

export default router;
