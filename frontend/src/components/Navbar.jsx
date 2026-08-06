// import { Link, NavLink } from "react-router-dom";
// import { Heart, ShoppingCart, Menu, User, X } from "lucide-react";
// import { useState } from "react";
// import logo from "../assets/ZafaFperfumelogo.png";

// function Navbar() {
// const [open, setOpen] = useState(false);

// const linkClass = ({ isActive }) => 
// isActive
//       ? "text-black font-semibold"
//        : "text-gray-600 hover:text-black transition-colors";

//    const mobileLinkClass = ({ isActive }) =>
//      isActive
//        ? "text-black font-semibold"
//        : "text-gray-700 hover:text-black transition-colors";

//    return (
//      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-80">
//        <div className="max-w-9xl mx-auto px-5 sm:px-8 lg:px-10">
//         <div className="flex justify-between items-center h-15">
          
          
//            <Link to="/" className="flex items-center h-full">
//              <img src={logo} alt="ZafaF Logo" className="h-80 w-80 object-contain mt-10" />
//              {/* <span className="text-2xl font-bold text-gray-900 tracking-tight">ZafaF</span> */}
//            </Link>

          
//            <div className="hidden md:flex items-center space-x-8">
//              <NavLink to="/" className={linkClass}>
//                Home
//              </NavLink>
//              <NavLink to="/products" className={linkClass}>
//                Products
//              </NavLink>
//            </div>

          
// //           <div className="hidden md:flex items-center space-x-5">
// //             <NavLink 
// //               to="/wishlist" 
// //               className="text-gray-700 hover:text-rose-600 transition-colors"
// //               title="Wishlist"
// //             >
// //               <Heart className="h-5 w-5" />
// //             </NavLink>
// //             <NavLink 
// //               to="/cart" 
// //               className="text-gray-700 hover:text-rose-600 transition-colors"
// //               title="Cart"
// //             >
// //               <ShoppingCart className="h-5 w-5" />
// //             </NavLink>
// //             <NavLink 
// //               to="/profile" 
// //               className="text-gray-700 hover:text-rose-600 transition-colors"
// //               title="Profile"
// //             >
// //               <User className="h-5 w-5" />
// //             </NavLink>
// //             <NavLink 
// //               to="/login" 
// //               className="px-5 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium text-sm"
// //             >
// //               Login
// //             </NavLink>
// //           </div>

          
// //           <button 
// //             className="md:hidden text-gray-700 hover:text-gray-900 transition-colors"
// //             onClick={() => setOpen(!open)}
// //             aria-label="Toggle menu"
// //           >
// //             {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
// //           </button>
// //         </div>
// //       </div>

      
// //       {open && (
// //         <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
// //           <div className="px-4 pt-2 pb-4 space-y-3">
// //             <NavLink 
// //               to="/" 
// //               className={mobileLinkClass}
// //               onClick={() => setOpen(false)}
// //             >
// //               <div className="block py-2 px-3 rounded-md hover:bg-gray-50">
// //                 Home
// //               </div>
// //             </NavLink>
            
// //             <NavLink 
// //               to="/products" 
// //               className={mobileLinkClass}
// //               onClick={() => setOpen(false)}
// //             >
// //               <div className="block py-2 px-3 rounded-md hover:bg-gray-50">
// //                 Products
// //               </div>
// //             </NavLink>
            
// //             <NavLink 
// //               to="/wishlist" 
// //               className={mobileLinkClass}
// //               onClick={() => setOpen(false)}
// //             >
// //               <div className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50">
// //                 <Heart className="h-5 w-5 mr-3" />
// //                 Wishlist
// //               </div>
// //             </NavLink>
            
// //             <NavLink 
// //               to="/cart" 
// //               className={mobileLinkClass}
// //               onClick={() => setOpen(false)}
// //             >
// //               <div className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50">
// //                 <ShoppingCart className="h-5 w-5 mr-3" />
// //                 Cart
// //               </div>
// //             </NavLink>
            
// //             <NavLink 
// //               to="/profile" 
// //               className={mobileLinkClass}
// //               onClick={() => setOpen(false)}
// //             >
// //               <div className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50">
// //                 <User className="h-5 w-5 mr-3" />
// //                 Profile
// //               </div>
// //             </NavLink>
            
// //             <NavLink 
// //               to="/login" 
// //               onClick={() => setOpen(false)}
// //             >
// //               <div className="block py-2 px-4 bg-gray-900 text-white text-center rounded-md hover:bg-gray-800 transition-colors font-medium mt-2">
// //                 Login
// //               </div>
// //             </NavLink>
// //           </div>
// //         </div>
// //       )}
// //     </nav>
// //   );
// // }

// // export default Navbar;





// import { Link, NavLink } from "react-router-dom";
// import { Heart, ShoppingCart, Menu, User, X } from "lucide-react";
// import { useState } from "react";
// import logo from "../assets/ZafaFperfumelogo.png";

// function Navbar() {
//   const [open, setOpen] = useState(false);

//   const navLinkClass = ({ isActive }) =>
//     isActive
//       ? "text-black font-medium"
//       : "text-gray-600 hover:text-black transition-colors";

//   return (
//     <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
          
//           {/* LOGO */}
//                     <Link to="/" className="flex items-center h-full">
//              <img src={logo} alt="ZafaF Logo" className="h-80 w-80 object-contain mt-10" />
//             {/* <span className="text-2xl font-bold text-gray-900 tracking-tight">ZafaF</span> */}
//           </Link>

//           {/* DESKTOP LINKS */}
//           <div className="hidden md:flex items-center space-x-10">
//             <NavLink to="/" className={navLinkClass}>
//               Home
//             </NavLink>
//             <NavLink to="/products" className={navLinkClass}>
//               Products
//             </NavLink>
//           </div>

//           {/* DESKTOP ICONS */}
//           <div className="hidden md:flex items-center space-x-6">
//             <NavLink to="/wishlist" title="Wishlist">
//               <Heart className="h-5 w-5 text-gray-600 hover:text-black transition" />
//             </NavLink>

//             <NavLink to="/cart" title="Cart">
//               <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-black transition" />
//             </NavLink>

//             <NavLink to="/profile" title="Profile">
//               <User className="h-5 w-5 text-gray-600 hover:text-black transition" />
//             </NavLink>

//             <NavLink
//               to="/login"
//               className="px-5 py-2 border border-black text-black text-sm hover:bg-black hover:text-white transition"
//             >
//               Login
//             </NavLink>
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             className="md:hidden text-gray-700"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden bg-white border-t border-gray-100">
//           <div className="px-6 py-4 space-y-4">
//             <NavLink
//               to="/"
//               onClick={() => setOpen(false)}
//               className="block text-gray-700 hover:text-black"
//             >
//               Home
//             </NavLink>

//             <NavLink
//               to="/products"
//               onClick={() => setOpen(false)}
//               className="block text-gray-700 hover:text-black"
//             >
//               Products
//             </NavLink>

//             <NavLink
//               to="/wishlist"
//               onClick={() => setOpen(false)}
//               className="flex items-center gap-3 text-gray-700 hover:text-black"
//             >
//               <Heart size={18} /> Wishlist
//             </NavLink>

//             <NavLink
//               to="/cart"
//               onClick={() => setOpen(false)}
//               className="flex items-center gap-3 text-gray-700 hover:text-black"
//             >
//               <ShoppingCart size={18} /> Cart
//             </NavLink>

//             <NavLink
//               to="/profile"
//               onClick={() => setOpen(false)}
//               className="flex items-center gap-3 text-gray-700 hover:text-black"
//             >
//               <User size={18} /> Profile
//             </NavLink>

//             <NavLink
//               to="/login"
//               onClick={() => setOpen(false)}
//               className="block text-center border border-black py-2 mt-2 hover:bg-black hover:text-white transition"
//             >
//               Login
//             </NavLink>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;







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
  const [user, setUser] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Load user from localStorage
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

  // Load cart count
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

  // Custom event listener for user changes within the same tab
  useEffect(() => {
    const handleUserChange = () => {
      loadUser();
    };

    // Listen for custom event
    window.addEventListener("userChanged", handleUserChange);
    
    // Also listen for storage events (for cross-tab changes)
    window.addEventListener("storage", handleUserChange);
    
    return () => {
      window.removeEventListener("userChanged", handleUserChange);
      window.removeEventListener("storage", handleUserChange);
    };
  }, [loadUser]);

  // Load user on initial mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Cart count handling
  useEffect(() => {
    loadCartCount();
    
    const handleCartChange = () => {
      loadCartCount();
    };
    
    // Listen for both custom and storage events
    window.addEventListener("cartChanged", handleCartChange);
    window.addEventListener("storage", handleCartChange);
    
    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
      window.removeEventListener("storage", handleCartChange);
    };
  }, [loadCartCount]);

  // Close dropdowns when clicking outside
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

  // Handle scroll effect
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
    
    // Dispatch custom event to notify other components
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
    // { label: "NEW IN", path: "/products?category=new" },
    // { label: "MEN", path: "/products?gender=men" },
    // { label: "WOMEN", path: "/products?gender=women" },
    // { label: "UNISEX", path: "/products?gender=unisex" },
    // { label: "SALE", path: "/products?sale=true", highlight: true },
  ];

  // IMPORTANT: Add this function to refresh user state manually
  const refreshUser = () => {
    loadUser();
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-xs tracking-wider font-light">
        FREE SHIPPING ON ORDERS OVER ₹999 | EASY RETURNS WITHIN 30 DAYS
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link to="/" className="absolute left-4">
              <img src={logo} alt="ZafaF Perfume" className="h-14 sm:h-80 mt-8" />
            </Link>

            {/* Desktop Categories */}
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

            {/* Right Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search */}
              {/* <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button> */}

              {/* Wishlist */}
              <NavLink
                to="/wishlist"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
              </NavLink>

              {/* Cart */}
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

              {/* Profile */}
              <div ref={profileMenuRef} className="relative">
                <button
                  onClick={() => {
                    // Refresh user state before opening dropdown
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

                {/* Profile Dropdown */}
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

        {/* Search Overlay */}
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto animate-slideRight"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-wide">MENU</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
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

              {/* Categories */}
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

              {/* User Section - Refresh user state when opening mobile menu */}
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
                        refreshUser(); // Refresh before navigating
                      }}
                      className="block px-4 py-3 mb-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => {
                        setIsMenuOpen(false);
                        refreshUser(); // Refresh before navigating
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