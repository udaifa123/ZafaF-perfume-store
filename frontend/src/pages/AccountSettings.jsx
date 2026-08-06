import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { successAlert, errorAlert } from "../utils/alert";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  Check,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Camera,
  Trash2
} from "lucide-react";

export default function AccountSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // User data states
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: ""
    },
    preferences: {
      newsletter: true,
      marketingEmails: false,
      smsNotifications: true
    }
  });

  // Password change states
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const token = userInfo?.token;

if (!token) {
  navigate("/login");
  return;
}


      const response = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUserData({
        name: response.data.name || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        address: {
          street: response.data.address?.street || "",
          city: response.data.address?.city || "",
          state: response.data.address?.state || "",
          country: response.data.address?.country || "India",
          pincode: response.data.address?.pincode || ""
        },
        preferences: {
          newsletter: response.data.preferences?.newsletter ?? true,
          marketingEmails: response.data.preferences?.marketingEmails ?? false,
          smsNotifications: response.data.preferences?.smsNotifications ?? true
        }
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      errorAlert("Error", "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      
      case "phone":
        if (value && !/^[0-9]{10}$/.test(value)) error = "Phone must be 10 digits";
        break;
      
      case "address.street":
        if (!value.trim()) error = "Street address is required";
        break;
      
      case "address.pincode":
        if (value && !/^[0-9]{6}$/.test(value)) error = "Invalid pincode";
        break;
      
      case "newPassword":
        if (value && value.length < 6) error = "Password must be at least 6 characters";
        break;
      
      case "confirmPassword":
        if (value !== passwordData.newPassword) error = "Passwords do not match";
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setUserData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else if (name.startsWith("preferences.")) {
      const field = name.split(".")[1];
      setUserData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [field]: checked
        }
      }));
    } else if (name in passwordData) {
      setPasswordData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSaveProfile = async () => {
    // Validate all fields
    const newErrors = {};
    Object.keys(userData).forEach(key => {
      if (key !== "address" && key !== "preferences") {
        const error = validateField(key, userData[key]);
        if (error) newErrors[key] = error;
      }
    });

    // Validate address fields
    Object.keys(userData.address).forEach(key => {
      const error = validateField(`address.${key}`, userData.address[key]);
      if (error) newErrors[`address.${key}`] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      errorAlert("Validation Error", "Please fix the errors before saving");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(
        "/auth/update-profile",
        userData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update localStorage if name changed
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser.name !== userData.name) {
        localStorage.setItem("user", JSON.stringify({
          ...storedUser,
          name: userData.name
        }));
      }

      successAlert("Success", "Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      errorAlert("Error", err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    // Validate password fields
    const passwordErrors = {};
    
    if (!passwordData.currentPassword) {
      passwordErrors.currentPassword = "Current password is required";
    }
    
    if (!passwordData.newPassword) {
      passwordErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      passwordErrors.newPassword = "Password must be at least 6 characters";
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      passwordErrors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...passwordErrors }));
      errorAlert("Validation Error", "Please fix the password errors");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await API.put(
        "/auth/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      successAlert("Success", "Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      console.error("Error changing password:", err);
      errorAlert("Error", err.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API.delete("/auth/delete-account", {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      successAlert("Account Deleted", "Your account has been deleted successfully");
      navigate("/");
    } catch (err) {
      console.error("Error deleting account:", err);
      errorAlert("Error", err.response?.data?.message || "Failed to delete account");
      setDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
                ACCOUNT SETTINGS
              </h1>
              <p className="text-gray-500 text-sm">
                Manage your personal information, preferences, and security
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-600 hover:text-black font-medium tracking-wide uppercase flex items-center gap-1 self-start"
            >
              <X className="w-4 h-4" />
              BACK
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-6">
              <div className="space-y-1">
                <button
                  onClick={() => document.getElementById("profile-section").scrollIntoView({ behavior: "smooth" })}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors rounded"
                >
                  <User className="w-4 h-4" />
                  Personal Information
                </button>
                <button
                  onClick={() => document.getElementById("password-section").scrollIntoView({ behavior: "smooth" })}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors rounded"
                >
                  <Lock className="w-4 h-4" />
                  Password & Security
                </button>
                <button
                  onClick={() => document.getElementById("preferences-section").scrollIntoView({ behavior: "smooth" })}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors rounded"
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors rounded"
                >
                  <CreditCard className="w-4 h-4" />
                  Order History
                </button>
                <button
                  onClick={() => navigate("/help")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors rounded"
                >
                  <Shield className="w-4 h-4" />
                  Privacy & Help
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="text-xs text-gray-500 space-y-2">
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Account created: {new Date().toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Email verified
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information Section */}
            <div id="profile-section" className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your personal details and contact information
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black transition-colors`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && touched.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black transition-colors`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.phone && touched.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black transition-colors`}
                        placeholder="10-digit phone number"
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Street Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address.street"
                        value={userData.address.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors["address.street"] && touched["address.street"]
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black transition-colors`}
                        placeholder="House no., Building, Street"
                      />
                    </div>
                    {errors["address.street"] && touched["address.street"] && (
                      <p className="mt-1 text-sm text-red-600">{errors["address.street"]}</p>
                    )}
                  </div>

                  {/* City, State, Pincode */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={userData.address.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={userData.address.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="address.pincode"
                        value={userData.address.pincode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border ${
                          errors["address.pincode"] && touched["address.pincode"]
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black transition-colors`}
                        placeholder="6-digit pincode"
                      />
                      {errors["address.pincode"] && touched["address.pincode"] && (
                        <p className="mt-1 text-sm text-red-600">{errors["address.pincode"]}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        SAVING...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        SAVE CHANGES
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Password & Security Section */}
            <div id="password-section" className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password & Security
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Change your password and manage account security
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 pr-10 w-full px-4 py-3 border ${
                          errors.currentPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black transition-colors`}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 pr-10 w-full px-4 py-3 border ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black transition-colors`}
                        placeholder="At least 6 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black transition-colors`}
                        placeholder="Confirm your new password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "UPDATING..." : "UPDATE PASSWORD"}
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div id="preferences-section" className="bg-white border border-gray-200 rounded-lg">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Choose how you want to be notified about your account
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Newsletter</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Receive updates about new products and promotions
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.newsletter"
                        checked={userData.preferences.newsletter}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Marketing Emails</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Receive promotional emails and special offers
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.marketingEmails"
                        checked={userData.preferences.marketingEmails}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Receive order updates and alerts via SMS
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.smsNotifications"
                        checked={userData.preferences.smsNotifications}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? "SAVING..." : "SAVE PREFERENCES"}
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white border border-red-200 rounded-lg">
              <div className="border-b border-red-100 p-6">
                <h2 className="text-lg font-medium text-red-700 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Danger Zone
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Irreversible actions. Proceed with caution.
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delete Account</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Once you delete your account, there is no going back. All your data will be permanently removed.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {deleteConfirm && (
                        <p className="text-sm text-red-600 font-medium text-center">
                          Are you absolutely sure? Type "DELETE" to confirm
                        </p>
                      )}
                      <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-2.5 text-sm font-medium tracking-wider uppercase border border-red-600 text-red-600 hover:bg-red-50 hover:border-red-700 transition-colors flex items-center gap-2 justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteConfirm ? "CONFIRM DELETE" : "DELETE ACCOUNT"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}