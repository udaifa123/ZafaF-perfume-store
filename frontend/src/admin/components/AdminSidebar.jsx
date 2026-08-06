import { NavLink, useNavigate } from "react-router-dom";
import { 
  Home, 
  Users, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  LogOut,
  ChevronRight,
  Settings,
  Shield,
  DollarSign,
  Activity,
  Briefcase,
  Menu,
  Star,
  X
} from "lucide-react";
import { useState } from "react";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
     ${isActive 
       ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/30" 
       : "text-gray-400 hover:bg-gray-800 hover:text-white hover:shadow-sm"
     }`;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2.5 bg-gray-900 rounded-lg shadow-lg border border-gray-800 hover:bg-gray-800 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-300" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        ${isCollapsed ? 'w-20' : 'w-64'} 
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative h-screen bg-gray-900 border-r border-gray-800 flex flex-col 
        transition-all duration-300 z-40 lg:z-auto
        shadow-2xl lg:shadow-lg
      `}>
        {/* Logo Section */}
        <div className={`p-6 border-b border-gray-800 ${isCollapsed ? 'px-4' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                  <p className="text-xs text-gray-400">Dashboard v2.0</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            )}
            
            {/* Collapse Toggle Button (Desktop only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className={`mb-6 ${isCollapsed ? 'px-2' : 'px-2'}`}>
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main</p>
            )}
            <nav className="space-y-1">
              <NavLink 
                to="/admin/dashboard" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                {!isCollapsed && <span>Dashboard</span>}
              </NavLink>

              <NavLink 
                to="/admin/users" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-5 h-5" />
                {!isCollapsed && <span>Users</span>}
              </NavLink>

              <NavLink 
                to="/admin/products" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="w-5 h-5" />
                {!isCollapsed && <span>Products</span>}
              </NavLink>

              <NavLink 
                to="/admin/orders" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBag className="w-5 h-5" />
                {!isCollapsed && <span>Orders</span>}
              </NavLink>

              <NavLink 
                to="/admin/revenue" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <DollarSign className="w-5 h-5" />
                {!isCollapsed && <span>Revenue</span>}
              </NavLink>

              <NavLink
  to="/admin/reviews"
  className={linkClass}
>
  <Star className="w-5 h-5" />
  {!isCollapsed && <span>Reviews</span>}
</NavLink>

            </nav>
          </div>

          {/* Analytics Section */}
          <div className={`mb-6 ${isCollapsed ? 'px-2' : 'px-2'}`}>
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Analytics</p>
            )}
            <nav className="space-y-1">
              <NavLink 
                to="/admin/analytics" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Activity className="w-5 h-5" />
                {!isCollapsed && <span>Analytics</span>}
              </NavLink>

              <NavLink 
                to="/admin/reports" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart3 className="w-5 h-5" />
                {!isCollapsed && <span>Reports</span>}
              </NavLink>
            </nav>
          </div>

          {/* Settings Section */}
          <div className={`${isCollapsed ? 'px-2' : 'px-2'}`}>
            {!isCollapsed && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Settings</p>
            )}
            <nav className="space-y-1">
              <NavLink 
                to="/admin/settings" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span>Settings</span>}
              </NavLink>

              <NavLink 
                to="/admin/profile" 
                className={linkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase className="w-5 h-5" />
                {!isCollapsed && <span>Profile</span>}
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Bottom Section - User & Logout */}
        <div className="p-4 border-t border-gray-800">
          {!isCollapsed ? (
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                    A
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Admin</p>
                  <p className="text-xs text-gray-400 truncate">admin@gmail.com</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-400 rounded-lg hover:from-red-800/50 hover:to-red-700/50 hover:text-red-300 hover:shadow-sm transition-all duration-200 border border-red-800/50 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              {/* User Avatar (Collapsed) */}
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity shadow-lg">
                A
              </div>

              {/* Logout Button (Collapsed) */}
              <button
                onClick={handleLogout}
                className="p-3 bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-400 rounded-lg hover:from-red-800/50 hover:to-red-700/50 hover:text-red-300 transition-all duration-200 border border-red-800/50"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Version Info */}
          {!isCollapsed && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-center text-gray-500">v2.1.0 • © 2024</p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile close button inside sidebar */}
      {mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2.5 text-gray-400 hover:text-gray-200 z-50"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </>
  );
}