// import {Routes,Route} from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProtectedRoute from "./routes/ProtectedRoute";

// function App(){
//   return(
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register/>} />
//     </Routes>
//   )
// }
// export default App;




// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProductList from "./pages/ProductList";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Wishlist from "./pages/Wishlist";

// import OrderHistory from "./pages/OrderHistory";
// import AdminDashboard from "./pages/AdminDashboard";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
        
//         <Route path="/" element={<Register />} />
//         <Route path="/login" element={<Login />} />

        
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/wishlist" element={<Wishlist />} />

//         <Route path="/orders" element={<OrderHistory />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProductList from "./pages/ProductList";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Wishlist from "./pages/Wishlist";
// import OrderHistory from "./pages/OrderHistory";
// import AdminDashboard from "./pages/AdminDashboard";
// import OrderSuccess from "./pages/OrderSuccess"; 

// export default function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />

    
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

        
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/orders" element={<OrderHistory />} />
//         <Route path="/order-success/:orderId" element={<OrderSuccess />} /> {/* ✅ new */}

        
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// }




// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProductList from "./pages/ProductList";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Wishlist from "./pages/Wishlist";
// import OrderHistory from "./pages/OrderHistory";
// import AdminDashboard from "./pages/AdminDashboard";
// import OrderSuccess from "./pages/OrderSuccess"; 
// import ProtectedRoute from "./routes/ProtectedRoute";
// import AuthProvider from "./context/AuthContext";

// export default function App() {
//   return (
//     <AuthProvider>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route path="/products" element={<ProductList />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
//         <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
//         <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
//         <Route path="/order-success/:orderId" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />

//         <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
//       </Routes>
//       <Footer />
//     </AuthProvider>
//   );
// }




import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 

// import AddReview from "./components/AddReview";
// import MyReviews from "./components/MyReviews";

// USER PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import UserOrders from "./pages/Orders";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import AddReview from "./pages/AddReview";
import MyReviews from "./pages/MyReviews";
import EditReview from "./pages/EditReview";
import PayPalSuccess from "./pages/PayPalSuccess";
// import Revenue from "./pages/Revenue";

// ROUTE GUARDS
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

// ADMIN
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import Users from "./admin/pages/Users";
import AdminOrders from "./admin/pages/Orders";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminRevenue from "./admin/pages/AdminRevenue";
import AdminAnalytics from "./admin/pages/AdminAnalytics";
import AdminReports from "./admin/pages/AdminReports";
import AdminSettings from "./admin/pages/AdminSettings";
import AdminProfile from "./admin/pages/AdminProfile";
import AdminReviews from "./admin/pages/AdminReviews";


export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-review/:id" element={<AddReview />} />
        <Route path="/my-reviews" element={<MyReviews />} />
<Route path="/product/:productId/edit-review/:reviewId" element={<EditReview />} />
<Route path="/paypal-success" element={<PayPalSuccess />} />
<Route path="/paypal-success" element={<PayPalSuccess />} />


        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          }
        />

        {/* ================= REVIEWS ================= */}
<Route
  path="/product/:id/add-review"
  element={
    <ProtectedRoute>
      <AddReview />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-reviews"
  element={
    <ProtectedRoute>
      <MyReviews />
    </ProtectedRoute>
  }
/>


        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminLayout />
    </AdminProtectedRoute>
  }
>
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="users" element={<Users />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="revenue" element={<AdminRevenue />} />
  <Route path="analytics" element={<AdminAnalytics />} />
  <Route path="reports" element={<AdminReports />} />
  <Route path="settings" element={<AdminSettings />} />
  <Route path="profile" element={<AdminProfile />} />
  <Route path="/admin/reviews" element={<AdminReviews />} />


</Route>

      </Routes>




      {!isAdminRoute && <Footer />}
    </>
  );
}



        


// {/* ADMIN ROUTES */}
// <Route path="/admin/login" element={<AdminLogin />} />

// <Route
//   path="/admin/dashboard"
//   element={
//     <AdminProtectedRoute>
//       <AdminDashboard />
//     </AdminProtectedRoute>
//   }
// />

// <Route
//   path="/admin/users"
//   element={
//     <AdminProtectedRoute>
//       <Users />
//     </AdminProtectedRoute>
//   }
// />

// <Route
//   path="/admin/orders"
//   element={
//     <AdminProtectedRoute>
//       <AdminOrders />
//     </AdminProtectedRoute>
//   }
// />

// <Route
//   path="/admin/products"
//   element={
//     <AdminProtectedRoute>
//       <AdminProducts />
//     </AdminProtectedRoute>
//   }
// />

// <Route
//   path="/admin/products/new"
//   element={
//     <AdminProtectedRoute>
//       <CreateProduct />
//     </AdminProtectedRoute>
//   }
// />
