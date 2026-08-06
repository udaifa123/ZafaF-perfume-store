import { useContext } from "react";
import { AdminAuthContext } from "../context/AdminAuthContext";

export default function AdminHeader() {
  const { admin, logoutAdmin } = useContext(AdminAuthContext);

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <h1 className="text-white font-medium text-lg">
        ZafaF Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        {admin && (
          <span className="text-gray-300 text-sm">
            Welcome, {admin.name || "Admin"}
          </span>
        )}

        <button
          onClick={logoutAdmin}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
