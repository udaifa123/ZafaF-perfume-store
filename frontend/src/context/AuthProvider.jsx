import { useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");

      if (!storedUserInfo) {
        return null;
      }

      const parsedUserInfo = JSON.parse(storedUserInfo);

      return parsedUserInfo?.user || null;
    } catch (error) {
      console.error("Error loading user:", error);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");

      if (!storedUserInfo) {
        return null;
      }

      const parsedUserInfo = JSON.parse(storedUserInfo);

      return parsedUserInfo?.token || null;
    } catch (error) {
      console.error("Error loading token:", error);
      return null;
    }
  });

  const [loading] = useState(false);

  const loginUser = (data) => {
    const userData = data.user || {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    setUser(userData);
    setToken(data.token);

    const userInfo = {
      user: userData,
      token: data.token,
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    window.dispatchEvent(new Event("userChanged"));
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("userInfo");

    window.dispatchEvent(new Event("userChanged"));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginUser,
        logoutUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;