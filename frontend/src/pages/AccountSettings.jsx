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
  Check,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Trash2,
} from "lucide-react";

export default function AccountSettings() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
    },
    preferences: {
      newsletter: true,
      marketingEmails: false,
      smsNotifications: true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // =====================================================
  // FETCH USER DATA
  // =====================================================

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserInfo = localStorage.getItem("userInfo");

        if (!storedUserInfo) {
          navigate("/login");
          return;
        }

        const userInfo = JSON.parse(storedUserInfo);
        const token = userInfo?.token;

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setUserData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",

          address: {
            street: data.address?.street || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            country: data.address?.country || "India",
            pincode: data.address?.pincode || "",
          },

          preferences: {
            newsletter: data.preferences?.newsletter ?? true,
            marketingEmails:
              data.preferences?.marketingEmails ?? false,
            smsNotifications:
              data.preferences?.smsNotifications ?? true,
          },
        });
      } catch (err) {
        console.error("Error fetching user data:", err);

        errorAlert(
          "Error",
          err.response?.data?.message || "Failed to load user data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          error = "Invalid email format";
        }
        break;

      case "phone":
        if (value && !/^[0-9]{10}$/.test(value)) {
          error = "Phone must be 10 digits";
        }
        break;

      case "address.street":
        if (!value.trim()) {
          error = "Street address is required";
        }
        break;

      case "address.city":
        if (!value.trim()) {
          error = "City is required";
        }
        break;

      case "address.state":
        if (!value.trim()) {
          error = "State is required";
        }
        break;

      case "address.pincode":
        if (!value.trim()) {
          error = "Pincode is required";
        } else if (!/^[0-9]{6}$/.test(value)) {
          error = "Invalid pincode";
        }
        break;

      case "currentPassword":
        if (!value) {
          error = "Current password is required";
        }
        break;

      case "newPassword":
        if (!value) {
          error = "New password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== passwordData.newPassword) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    // Address
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];

      setUserData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    }

    // Preferences
    else if (name.startsWith("preferences.")) {
      const field = name.split(".")[1];

      setUserData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [field]: checked,
        },
      }));
    }

    // Password
    else if (name in passwordData) {
      setPasswordData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Normal user data
    else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // =====================================================
  // HANDLE BLUR
  // =====================================================

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      return userInfo?.token || null;
    } catch (error) {
      console.error("Error reading userInfo:", error);
      return null;
    }
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSaveProfile = async () => {
    const newErrors = {};

    // Validate name/email/phone
    ["name", "email", "phone"].forEach((key) => {
      const error = validateField(key, userData[key]);

      if (error) {
        newErrors[key] = error;
      }
    });

    // Validate address
    Object.keys(userData.address).forEach((key) => {
      if (key === "country") return;

      const error = validateField(
        `address.${key}`,
        userData.address[key]
      );

      if (error) {
        newErrors[`address.${key}`] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      setTouched({
        name: true,
        email: true,
        phone: true,
        "address.street": true,
        "address.city": true,
        "address.state": true,
        "address.pincode": true,
      });

      errorAlert(
        "Validation Error",
        "Please fix the errors before saving"
      );

      return;
    }

    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    setSaving(true);

    try {
      await API.put(
        "/auth/update-profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update userInfo in localStorage
      const storedUserInfo = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
      );

      const updatedUser = {
        ...storedUserInfo.user,
        name: userData.name,
        email: userData.email,
      };

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...storedUserInfo,
          user: updatedUser,
        })
      );

      // Tell Navbar that user changed
      window.dispatchEvent(new Event("userChanged"));

      successAlert(
        "Success",
        "Profile updated successfully"
      );
    } catch (err) {
      console.error("Error updating profile:", err);

      errorAlert(
        "Error",
        err.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleChangePassword = async () => {
    const passwordErrors = {};

    const currentPasswordError = validateField(
      "currentPassword",
      passwordData.currentPassword
    );

    const newPasswordError = validateField(
      "newPassword",
      passwordData.newPassword
    );

    const confirmPasswordError = validateField(
      "confirmPassword",
      passwordData.confirmPassword
    );

    if (currentPasswordError) {
      passwordErrors.currentPassword = currentPasswordError;
    }

    if (newPasswordError) {
      passwordErrors.newPassword = newPasswordError;
    }

    if (confirmPasswordError) {
      passwordErrors.confirmPassword =
        confirmPasswordError;
    }

    if (Object.keys(passwordErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        ...passwordErrors,
      }));

      setTouched((prev) => ({
        ...prev,
        currentPassword: true,
        newPassword: true,
        confirmPassword: true,
      }));

      errorAlert(
        "Validation Error",
        "Please fix the password errors"
      );

      return;
    }

    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    setSaving(true);

    try {
      await API.put(
        "/auth/change-password",
        {
          currentPassword:
            passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      successAlert(
        "Success",
        "Password changed successfully"
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (err) {
      console.error("Error changing password:", err);

      errorAlert(
        "Error",
        err.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE ACCOUNT
  // =====================================================

  const handleDeleteAccount = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    if (deleteText !== "DELETE") {
      errorAlert(
        "Confirmation Required",
        'Please type "DELETE" to confirm'
      );
      return;
    }

    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await API.delete("/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("userInfo");

      window.dispatchEvent(new Event("userChanged"));

      successAlert(
        "Account Deleted",
        "Your account has been deleted successfully"
      );

      navigate("/");
    } catch (err) {
      console.error("Error deleting account:", err);

      errorAlert(
        "Error",
        err.response?.data?.message ||
          "Failed to delete account"
      );

      setDeleteConfirm(false);
      setDeleteText("");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-black border-t-transparent mx-auto mb-4"></div>

          <p className="text-gray-600">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-black font-medium tracking-wide uppercase flex items-center gap-1 mb-6"
          >
            ← BACK
          </button>

          <h1 className="text-3xl font-light tracking-wider">
            ACCOUNT SETTINGS
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal information,
            preferences, and security
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDEBAR */}

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-6">

              <div className="space-y-1">

                <button
                  onClick={() =>
                    document
                      .getElementById("profile-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors rounded"
                >
                  <User className="w-4 h-4" />
                  Personal Information
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("password-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors rounded"
                >
                  <Lock className="w-4 h-4" />
                  Password & Security
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("preferences-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
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
                    Account created:{" "}
                    {new Date().toLocaleDateString()}
                  </p>

                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Email verified
                  </p>

                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="lg:col-span-2 space-y-8">

            {/* =====================================================
                PERSONAL INFORMATION
            ===================================================== */}

            <div
              id="profile-section"
              className="bg-white border border-gray-200 rounded-lg"
            >
              <div className="border-b border-gray-100 p-6">

                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update your personal details and
                  contact information
                </p>

              </div>

              <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* NAME */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>

                    <div className="relative">

                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

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
                        } focus:outline-none focus:border-black`}
                        placeholder="Enter your full name"
                      />

                    </div>

                    {errors.name && touched.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>

                    <div className="relative">

                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

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
                        } focus:outline-none focus:border-black`}
                        placeholder="you@example.com"
                      />

                    </div>

                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <div className="relative">

                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

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
                        } focus:outline-none focus:border-black`}
                        placeholder="10-digit phone number"
                      />

                    </div>

                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* STREET */}

                  <div className="md:col-span-2">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>

                    <div className="relative">

                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                      <input
                        type="text"
                        name="address.street"
                        value={userData.address.street}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors["address.street"] &&
                          touched["address.street"]
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-black`}
                        placeholder="House no., Building, Street"
                      />

                    </div>

                    {errors["address.street"] &&
                      touched["address.street"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["address.street"]}
                        </p>
                      )}

                  </div>

                  {/* CITY */}

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
                      className={`w-full px-4 py-3 border ${
                        errors["address.city"] &&
                        touched["address.city"]
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:border-black`}
                      placeholder="City"
                    />

                    {errors["address.city"] &&
                      touched["address.city"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["address.city"]}
                        </p>
                      )}

                  </div>

                  {/* STATE */}

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
                      className={`w-full px-4 py-3 border ${
                        errors["address.state"] &&
                        touched["address.state"]
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:border-black`}
                      placeholder="State"
                    />

                    {errors["address.state"] &&
                      touched["address.state"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["address.state"]}
                        </p>
                      )}

                  </div>

                  {/* PINCODE */}

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
                        errors["address.pincode"] &&
                        touched["address.pincode"]
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:border-black`}
                      placeholder="6-digit pincode"
                    />

                    {errors["address.pincode"] &&
                      touched["address.pincode"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["address.pincode"]}
                        </p>
                      )}

                  </div>

                </div>

                {/* SAVE */}

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">

                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-900 disabled:opacity-50 flex items-center gap-2"
                  >

                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
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

            {/* =====================================================
                PASSWORD
            ===================================================== */}

            <div
              id="password-section"
              className="bg-white border border-gray-200 rounded-lg"
            >

              <div className="border-b border-gray-100 p-6">

                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password & Security
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Change your password and manage account security
                </p>

              </div>

              <div className="p-6 space-y-6">

                {/* CURRENT PASSWORD */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password *
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                    <input
                      type={
                        showCurrentPassword
                          ? "text"
                          : "password"
                      }
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`pl-10 pr-10 w-full px-4 py-3 border ${
                        errors.currentPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:border-black`}
                      placeholder="Enter current password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(
                          !showCurrentPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                  </div>

                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.currentPassword}
                    </p>
                  )}

                </div>

                {/* NEW PASSWORD */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password *
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                    <input
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`pl-10 pr-10 w-full px-4 py-3 border ${
                        errors.newPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:outline-none focus:border-black`}
                      placeholder="At least 6 characters"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                  </div>

                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.newPassword}
                    </p>
                  )}

                </div>

                {/* CONFIRM PASSWORD */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password *
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

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
                      } focus:outline-none focus:border-black`}
                      placeholder="Confirm your new password"
                    />

                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}

                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">

                  <button
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-900 disabled:opacity-50"
                  >
                    {saving
                      ? "UPDATING..."
                      : "UPDATE PASSWORD"}
                  </button>

                </div>

              </div>
            </div>

            {/* =====================================================
                PREFERENCES
            ===================================================== */}

            <div
              id="preferences-section"
              className="bg-white border border-gray-200 rounded-lg"
            >

              <div className="border-b border-gray-100 p-6">

                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Choose how you want to be notified
                </p>

              </div>

              <div className="p-6 space-y-6">

                {/* NEWSLETTER */}

                <label className="flex items-center justify-between cursor-pointer">

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Newsletter
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Receive updates about new products
                      and promotions
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="preferences.newsletter"
                    checked={
                      userData.preferences.newsletter
                    }
                    onChange={handleChange}
                    className="w-5 h-5"
                  />

                </label>

                {/* MARKETING */}

                <label className="flex items-center justify-between cursor-pointer">

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Marketing Emails
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Receive promotional emails and offers
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="preferences.marketingEmails"
                    checked={
                      userData.preferences.marketingEmails
                    }
                    onChange={handleChange}
                    className="w-5 h-5"
                  />

                </label>

                {/* SMS */}

                <label className="flex items-center justify-between cursor-pointer">

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      SMS Notifications
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Receive order updates via SMS
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="preferences.smsNotifications"
                    checked={
                      userData.preferences.smsNotifications
                    }
                    onChange={handleChange}
                    className="w-5 h-5"
                  />

                </label>

                <div className="pt-6 border-t border-gray-100 flex justify-end">

                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-gray-900 disabled:opacity-50"
                  >
                    {saving
                      ? "SAVING..."
                      : "SAVE PREFERENCES"}
                  </button>

                </div>

              </div>
            </div>

            {/* =====================================================
                DANGER ZONE
            ===================================================== */}

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

                <p className="text-sm font-medium text-gray-900">
                  Delete Account
                </p>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                  Once you delete your account, there is
                  no going back. All your data will be
                  permanently removed.
                </p>

                {!deleteConfirm ? (
                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-2.5 text-sm font-medium tracking-wider uppercase border border-red-600 text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    DELETE ACCOUNT
                  </button>
                ) : (
                  <div className="space-y-3">

                    <p className="text-sm text-red-600 font-medium">
                      Type DELETE to confirm account deletion.
                    </p>

                    <input
                      type="text"
                      value={deleteText}
                      onChange={(e) =>
                        setDeleteText(e.target.value)
                      }
                      placeholder="Type DELETE"
                      className="w-full px-4 py-3 border border-red-300 focus:outline-none focus:border-red-600"
                    />

                    <div className="flex gap-3">

                      <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-2.5 bg-red-600 text-white text-sm font-medium uppercase hover:bg-red-700"
                      >
                        CONFIRM DELETE
                      </button>

                      <button
                        onClick={() => {
                          setDeleteConfirm(false);
                          setDeleteText("");
                        }}
                        className="px-6 py-2.5 border border-gray-300 text-sm font-medium uppercase hover:bg-gray-50"
                      >
                        CANCEL
                      </button>

                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}