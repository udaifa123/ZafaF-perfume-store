import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "./AdminAuthContext";

export default function AdminAuthProvider({ children }) {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(() => {
    try {
      const data = localStorage.getItem("admin");

      if (!data) {
        return null;
      }

      return JSON.parse(data);
    } catch (error) {
      console.error("Error loading admin:", error);
      return null;
    }
  });

  const loginAdmin = (data) => {
    localStorage.setItem("admin", JSON.stringify(data.admin));
    localStorage.setItem("adminToken", data.token);

    setAdmin(data.admin);

    navigate("/admin/dashboard");
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");

    setAdmin(null);

    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}