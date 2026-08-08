
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 



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



        