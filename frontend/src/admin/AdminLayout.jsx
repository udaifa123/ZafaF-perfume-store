import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";
import AdminFooter from "./components/AdminFooter";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* SIDEBAR */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* FOOTER */}
        <AdminFooter />
      </div>
    </div>
  );
}
