import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  X,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import logo from "../assets/Zafafperfumelogo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
 const [user, setUser] = useState(() => {
  try {
    const data = localStorage.getItem("userInfo");

    if (!data) return null;

    const parsed = JSON.parse(data);
    return parsed?.user || null;
  } catch (error) {
    console.error("Error loading user:", error);
    return null;
  }
});

const [isSearchOpen, setIsSearchOpen] = useState(false);

const [cartCount, setCartCount] = useState(() => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    return cartItems.reduce(
      (total, item) => total + (item.qty || 1),
      0
    );
  } catch (error) {
    console.error("Error loading cart count:", error);
    return 0;
  }
});

  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

  const loadUser = useCallback(() => {
    try {
      const data = localStorage.getItem("userInfo");
      if (!data) {
        setUser(null);
        return;
      }
      
      const parsed = JSON.parse(data);
      setUser(parsed?.user || null);
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(null);
    }
  }, []);

  const loadCartCount = useCallback(() => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const count = cartItems.reduce((total, item) => total + (item.qty || 1), 0);
      setCartCount(count);
    } catch (error) {
      console.error("Error loading cart count:", error);
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    const handleUserChange = () => {
      loadUser();
    };

    window.addEventListener("userChanged", handleUserChange);
    
    window.addEventListener("storage", handleUserChange);
    
    return () => {
      window.removeEventListener("userChanged", handleUserChange);
      window.removeEventListener("storage", handleUserChange);
    };
  }, [loadUser]);

  // useEffect(() => {
  //   loadUser();
  // }, [loadUser]);

useEffect(() => {
  const handleCartChange = () => {
    loadCartCount();
  };

  window.addEventListener("cartChanged", handleCartChange);
  window.addEventListener("storage", handleCartChange);

  return () => {
    window.removeEventListener("cartChanged", handleCartChange);
    window.removeEventListener("storage", handleCartChange);
  };
}, [loadCartCount]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
    
    window.dispatchEvent(new Event("userChanged"));
    window.dispatchEvent(new Event("storage"));
    
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  const categories = [
   
  ];

  const refreshUser = () => {
    loadUser();
  };

  return (
    <>
      <div className="bg-black text-white text-center py-2 text-xs tracking-wider font-light">
        FREE SHIPPING ON ORDERS OVER ₹999 | EASY RETURNS WITHIN 30 DAYS
      </div>

      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>

            <Link to="/" className="absolute left-4">
              <img src={logo} alt="ZafaF Perfume" className="h-14 sm:h-80 mt-8" />
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((cat) => (
                <NavLink
                  key={cat.label}
                  to={cat.path}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-widest transition-all duration-200 relative group ${
                      cat.highlight
                        ? "text-red-600 hover:text-red-700"
                        : "text-gray-800 hover:text-black"
                    } ${
                      isActive
                        ? "after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-black"
                        : ""
                    }`
                  }
                >
                  {cat.label}
                  <span className="absolute bottom-[-8px] left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}
            </div>

            <div className="flex items-center space-x-3 sm:space-x-5">
            
              <NavLink
                to="/wishlist"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
              </NavLink>

              <NavLink
                to="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={20} strokeWidth={1.5} />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              
              <div ref={profileMenuRef} className="relative">
                <button
                  onClick={() => {
                    refreshUser();
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                  }}
                  className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Profile"
                >
                  <User size={20} strokeWidth={1.5} />
                  <ChevronDown
                    size={14}
                    className={`hidden sm:block transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-100 animate-fadeIn">
                    {user ? (
                      <>
                        <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {user.email}
                          </p>
                        </div>

                        <div className="py-2">
                          <Link
                            to="/profile"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <User size={16} className="mr-3" />
                            My Profile
                          </Link>
                          <Link
                            to="/wishlist"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Heart size={16} className="mr-3" />
                            Wishlist
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <ShoppingCart size={16} className="mr-3" />
                            My Orders
                          </Link>
                        </div>

                        <div className="border-t border-gray-200">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <X size={16} className="mr-3" />
                            Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="py-2">
                        <Link
                          to="/login"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isSearchOpen && (
          <div
            ref={searchRef}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg animate-slideDown"
          >
            <div className="max-w-3xl mx-auto px-4 py-6">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for perfumes..."
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          <div
            ref={mobileMenuRef}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto animate-slideRight"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-wide">MENU</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                </form>
              </div>

              <div className="mb-8">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <NavLink
                      key={cat.label}
                      to={cat.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          cat.highlight
                            ? "text-red-600 hover:bg-red-50"
                            : isActive
                            ? "bg-black text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {cat.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                {user ? (
                  <>
                    <div className="mb-4 px-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => {
                        setIsMenuOpen(false);
                        refreshUser(); 
                      }}
                      className="block px-4 py-3 mb-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => {
                        setIsMenuOpen(false);
                        refreshUser(); 
                      }}
                      className="block px-4 py-3 text-sm font-medium text-center text-black border border-black rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideRight {
          animation: slideRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Navbar;