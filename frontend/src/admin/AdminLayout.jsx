import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";
import AdminFooter from "./components/AdminFooter";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
