import React, { useState } from "react";
import { Menu, LogOut, User, Shield, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ onMenuClick, onThemeToggle }) {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    onThemeToggle?.(!isDark);
  };

  return (
    <header className={`w-full ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-300`}>
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className={`md:hidden p-2 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg shadow-sm ${isDark ? 'bg-gradient-to-br from-blue-600 to-purple-700' : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
            <Shield size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Admin Panel
            </h1>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} hidden sm:block`}>
              Secure Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          onClick={() => navigate("/admin/profile")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} group`}
          aria-label="Admin profile"
        >
          <div className={`p-1.5 rounded-full ${isDark ? 'bg-gray-800 group-hover:bg-gray-700' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
            <User size={16} />
          </div>
          <span className="hidden md:block text-sm font-medium"></span>
        </button>

        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isDark ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400 hover:text-red-300' : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700'} font-medium`}
          aria-label="Logout"
        >
          <LogOut size={16} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </header>
  );
}