// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";

// pages
import Login from "./pages/login/login";


const router = createBrowserRouter([
    {
    path: "/login",
    element: <Login />, 
  },
  // {
  //   path: "/",
  //   element: <Layout />,
  //   children: [
      // { index: true, element: <ProtectedRoute><Content /></ProtectedRoute> }, // default landing page
      // { path: "notifications", element: <ProtectedRoute><Notifications /></ProtectedRoute> },
      // { path: "subscriptions", element: <ProtectedRoute><Subscriptions /></ProtectedRoute> },
      // { path: "analytics", element:<ProtectedRoute> <Analytics /></ProtectedRoute> },
      // { path: "settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },

      //  Only show Dashboard for admins
  //     {
  //       path: "dashboard",
  //       element: (
  //         <ProtectedRoute role="admin">
  //           <Dashboard />
  //         </ProtectedRoute>
  //       ),
  //     },
  //   ],
  // },
]);

export default router;
