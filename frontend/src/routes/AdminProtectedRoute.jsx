import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo || !userInfo.token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
