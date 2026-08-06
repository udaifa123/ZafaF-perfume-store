import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminAuthContext = createContext();

export default function AdminAuthProvider({ children }) {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  const loginAdmin = (data) => {
    localStorage.setItem("admin", JSON.stringify(data.admin));
    localStorage.setItem("adminToken", data.token);
    setAdmin(data.admin);
    navigate("/admin/dashboard");
  };

  const logoutAdmin = () => {
    localStorage.clear();
    setAdmin(null);
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
