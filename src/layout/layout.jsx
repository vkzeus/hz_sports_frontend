// src/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Topbar from "../components/topbar/topbar";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <div style={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Sidebar */}
      <Sidebar open={open} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* ✅ Pass "open" to Topbar */}
        <Topbar open={open} />

        {/* Push content below Topbar */}
        <div style={{ marginTop: "64px", flexGrow: 1, padding: "16px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
