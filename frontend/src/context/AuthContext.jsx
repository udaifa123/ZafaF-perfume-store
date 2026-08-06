// import { createContext, useState } from "react";

// export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   const loginUser = (userData) => {
//     setUser(userData);
//     setToken(userData.token);

//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", userData.token);
//   };

//   const logoutUser = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }




// AuthContext.jsx
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo?.user && storedUserInfo?.token) {
      setUser(storedUserInfo.user);
      setToken(storedUserInfo.token);
    }
    setLoading(false);
  }, []);

  const loginUser = (data) => {
    const userData = data.user || {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    setUser(userData);
    setToken(data.token);

    const userInfo = { user: userData, token: data.token };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
