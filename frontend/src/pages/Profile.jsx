import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  LogOut, 
  Edit2, 
  Camera,
  Settings,
  Bell,
  Lock,
  Smartphone,
  MapPin,
  Briefcase,
  Phone,
  Globe,
  Check,
  X,
  Save,
  Star,
  Award,
  Clock,
  ShieldCheck,
  Eye,
  EyeOff,
  CreditCard,
  Package,
  Heart,
  ShoppingCart,
  ChevronRight,
  Upload,
  Trash2,
  Key,
  Home,
  Plus,
  Building,
  Radio
} from "lucide-react";
import { successAlert, errorAlert } from "../utils/alert";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const fileInputRef = useRef(null);
  
  // Address states
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    id: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    addressType: "home",
    isDefault: false
  });
  
  // Settings states
  const [settings, setSettings] = useState({
    language: "English (United States)",
    region: "US",
    emailNotifications: true,
    orderUpdates: true,
    securityAlerts: true,
    promotionalEmails: false,
    smsNotifications: false,
    pushNotifications: true,
    profilePublic: true,
    showEmail: false,
    allowIndexing: true,
    showOnlineStatus: true,
    allowFriendRequests: true
  });

  const [stats, setStats] = useState({
    orders: 0,
    reviews: 0,
    wishlist: 0,
    cart: 0,
    spent: 0,
    joinedDays: 0
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
    jobTitle: ""
  });

  /* LOAD USER FROM LOCALSTORAGE + VERIFY */
  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (!data) {
      setLoading(false);
      return;
    }
    try {
      const parsed = JSON.parse(data);
      const userData = parsed.user;
      setUser(userData);
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        bio: userData.bio || "Passionate about technology and design. Love creating beautiful user experiences.",
        location: userData.location || "San Francisco, CA",
        website: userData.website || "https://portfolio.example.com",
        jobTitle: userData.jobTitle || "Software Developer"
      });
      
      // Load settings from localStorage if exists
      if (userData.settings) {
        setSettings(userData.settings);
      } else {
        // Save default settings
        userData.settings = settings;
        parsed.user = userData;
        localStorage.setItem("userInfo", JSON.stringify(parsed));
      }
      
      // Load profile image if exists
      if (userData.profileImage) {
        setProfileImage(userData.profileImage);
      }
      
      // Load addresses from localStorage
      if (userData.addresses && Array.isArray(userData.addresses)) {
        setAddresses(userData.addresses);
      } else {
        // Add sample addresses if none exist
        const sampleAddresses = [
          {
            id: "1",
            fullName: userData.name,
            phone: userData.phone || "+91 98765 43210",
            address: "123 Main Street, Koramangala",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560034",
            country: "India",
            addressType: "home",
            isDefault: true
          },
          {
            id: "2",
            fullName: userData.name,
            phone: userData.phone || "+91 98765 43210",
            address: "456 Work Avenue, Tech Park",
            city: "Bangalore",
            state: "Karnataka",
            zipCode: "560100",
            country: "India",
            addressType: "work",
            isDefault: false
          }
        ];
        setAddresses(sampleAddresses);
        // Save to localStorage
        userData.addresses = sampleAddresses;
        parsed.user = userData;
        localStorage.setItem("userInfo", JSON.stringify(parsed));
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("userInfo");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const ordersRes = await API.get("/orders");
        const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];

        const wishlistRes = await API.get("/wishlist");
        const wishlist = Array.isArray(wishlistRes.data) ? wishlistRes.data : [];

        const cartRes = await API.get("/cart");
        const cartItems = cartRes.data?.items || [];

        const reviewsRes = await API.get("/reviews/my");
        const reviews = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];

        const totalSpent = orders.reduce(
          (sum, order) => sum + (order.total || 0),
          0
        );

        const joinedDays = Math.floor(
          (Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)
        );

        setStats({
          orders: orders.length,
          wishlist: wishlist.length,
          cart: cartItems.length,
          reviews: reviews.length,
          spent: totalSpent,
          joinedDays
        });
      } catch (err) {
        console.error("Profile stats error:", err.response?.data || err.message);
      }
    };

    fetchStats();
  }, [user]);

  /* SETTINGS HANDLERS */
  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    handleSettingsChange('language', language);
    
    // Extract region code from language selection
    const regionMap = {
      "English (United States)": "US",
      "English (United Kingdom)": "UK",
      "Español (Spanish)": "ES",
      "Français (French)": "FR",
      "Deutsch (German)": "DE",
      "日本語 (Japanese)": "JP"
    };
    
    handleSettingsChange('region', regionMap[language] || "US");
  };

  const saveSettings = () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        userInfo.user.settings = settings;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        successAlert("Settings Saved", "Your settings have been updated successfully!");
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      errorAlert("Error", "Failed to save settings");
    }
  };

  /* ADDRESS FUNCTIONS */
  const handleSelectAddress = (address) => {
    // Store selected address in localStorage for checkout
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      userInfo.selectedAddress = address;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    
    successAlert("Address Selected", "Address selected for checkout!");
  };

  const handleAddAddress = () => {
    setAddressForm({
      id: "",
      fullName: user.name,
      phone: user.phone || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      addressType: "home",
      isDefault: addresses.length === 0
    });
    setEditingAddressId(null);
    setShowAddressForm(true);
  };

  const handleEditAddress = (address) => {
    setAddressForm({ ...address });
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = addresses.filter(addr => addr.id !== id);
      const deletedAddress = addresses.find(addr => addr.id === id);
      
      // If deleting default address, set first one as default
      if (deletedAddress?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true;
      }
      
      setAddresses(updatedAddresses);
      
      // Update localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        userInfo.user.addresses = updatedAddresses;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
      
      successAlert("Success", "Address deleted successfully!");
    }
  };

  const handleSetDefaultAddress = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updatedAddresses);
    
    // Update localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      userInfo.user.addresses = updatedAddresses;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    
    successAlert("Success", "Default address updated!");
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = () => {
    // Validation
    if (!addressForm.fullName.trim()) {
      errorAlert("Error", "Full name is required");
      return;
    }
    if (!addressForm.address.trim()) {
      errorAlert("Error", "Address is required");
      return;
    }
    if (!addressForm.city.trim()) {
      errorAlert("Error", "City is required");
      return;
    }
    if (!addressForm.state.trim()) {
      errorAlert("Error", "State is required");
      return;
    }
    if (!addressForm.zipCode.trim()) {
      errorAlert("Error", "ZIP code is required");
      return;
    }

    let updatedAddresses;
    
    if (editingAddressId) {
      // Update existing address
      updatedAddresses = addresses.map(addr => 
        addr.id === editingAddressId ? { ...addressForm } : addr
      );
    } else {
      // Add new address
      const newId = Date.now().toString();
      updatedAddresses = [
        ...addresses,
        { ...addressForm, id: newId }
      ];
    }

    // Ensure only one default address
    if (addressForm.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === (editingAddressId || addressForm.id)
      }));
    }

    setAddresses(updatedAddresses);
    setShowAddressForm(false);
    setEditingAddressId(null);
    
    // Update localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      userInfo.user.addresses = updatedAddresses;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    
    successAlert("Success", `Address ${editingAddressId ? 'updated' : 'added'} successfully!`);
  };

  const cancelAddressEdit = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  /* HANDLE IMAGE UPLOAD */
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      errorAlert('Error', 'Please select a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      errorAlert('Error', 'Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setPreviewImage(imageData);
      
      // Simulate upload delay
      setTimeout(() => {
        setProfileImage(imageData);
        setPreviewImage(null);
        setUploadingImage(false);
        
        // Save to localStorage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
          userInfo.user = { ...userInfo.user, profileImage: imageData };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
        
        successAlert("Success", "Profile picture updated successfully!");
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  const removeProfileImage = () => {
    if (window.confirm('Are you sure you want to remove your profile picture?')) {
      setProfileImage(null);
      setPreviewImage(null);
      
      // Remove from localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        delete userInfo.user.profileImage;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
      successAlert("Success", "Profile picture removed!");
    }
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    successAlert("Logged Out", "You have been logged out successfully!");
    window.location.href = "/login";
  };

  /* EDIT MODE HANDLERS */
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        jobTitle: user.jobTitle || ""
      });
    }
  };

  const handleSave = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const updatedUser = { 
        ...userInfo.user, 
        ...formData,
        profileImage: profileImage || userInfo.user.profileImage 
      };
      userInfo.user = updatedUser;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(updatedUser);
      setEditMode(false);
      
      // Success animation
      document.querySelector('.save-success')?.classList.add('animate-success');
      setTimeout(() => {
        document.querySelector('.save-success')?.classList.remove('animate-success');
      }, 2000);
      
      successAlert("Profile Updated", "Your profile has been updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      errorAlert("Error", "Failed to update profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* PASSWORD CHANGE HANDLERS */
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    setPasswordErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validatePassword = () => {
    const errors = {};
    let isValid = true;

    if (!passwordData.currentPassword.trim()) {
      errors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!passwordData.newPassword.trim()) {
      errors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!passwordData.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (passwordData.currentPassword.trim() === passwordData.newPassword.trim()) {
      errors.newPassword = "New password must be different from current password";
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  const changePassword = async () => {
    if (!validatePassword()) return;

    setChangingPassword(true);

    try {
      const res = await API.put(
        "/users/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordChanged(true);
      successAlert("Success", res.data.message || "Password changed successfully");

      setTimeout(() => {
        setPasswordChanged(false);
      }, 3000);

    } catch (err) {
      console.error(err);
      errorAlert(
        "Error",
        err.response?.data?.message || "Password change failed"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = () => {
    if (isDeleting) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      setIsDeleting(true);
      setTimeout(() => setIsDeleting(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium animate-pulse">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome!</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Please log in to access your personalized profile dashboard</p>
          <button 
            onClick={() => window.location.href = "/login"}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Stats data with explicit color classes
  const statsData = [
    { 
      icon: Package, 
      label: "Orders", 
      value: stats.orders, 
      color: "blue", 
      bg: "from-blue-50 to-blue-100",
      borderColor: "border-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      textColor: "text-blue-700"
    },
    { 
      icon: Star, 
      label: "Reviews", 
      value: stats.reviews, 
      color: "purple", 
      bg: "from-purple-50 to-purple-100",
      borderColor: "border-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-700"
    },
    { 
      icon: Heart, 
      label: "Wishlist", 
      value: stats.wishlist, 
      color: "pink", 
      bg: "from-pink-50 to-pink-100",
      borderColor: "border-pink-100",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      textColor: "text-pink-700"
    },
    { 
      icon: ShoppingCart, 
      label: "Cart", 
      value: stats.cart, 
      color: "orange", 
      bg: "from-orange-50 to-orange-100",
      borderColor: "border-orange-100",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      textColor: "text-orange-700"
    },
    { 
      icon: CreditCard, 
      label: "Total Spent", 
      value: `₹${stats.spent.toLocaleString()}`, 
      color: "emerald", 
      bg: "from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-700"
    }
  ];

  // Add Address tab to the tabs array
  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "address", label: "Address", icon: Home },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "activity", label: "Activity", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with Cover */}
      <div className="relative h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20">
        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Profile Header */}
          <div className="relative px-8 pt-8 pb-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar with Image Upload */}
              <div className="relative group">
                <div 
                  className="w-40 h-40 rounded-2xl shadow-2xl ring-8 ring-white/50 transform transition-transform group-hover:scale-105 duration-300 overflow-hidden"
                  style={{
                    background: profileImage 
                      ? `url(${previewImage || profileImage}) center/cover no-repeat`
                      : 'linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899)'
                  }}
                >
                  {!profileImage && !previewImage && (
                    <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>
                
                {/* Camera Button */}
                <button 
                  onClick={handleImageClick}
                  disabled={uploadingImage}
                  className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-200 border-2 border-gray-100 hover:border-blue-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Camera className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  )}
                </button>

                {/* Remove Image Button */}
                {profileImage && !uploadingImage && (
                  <button 
                    onClick={removeProfileImage}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-red-400 to-rose-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}

                {/* Verified Badge */}
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                    {user.name}
                  </h1>
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>
                <p className="text-lg text-gray-600 mb-1 flex items-center justify-center lg:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <p className="text-gray-500 mb-4 flex items-center justify-center lg:justify-start gap-2">
                  <Briefcase className="w-4 h-4" />
                  {formData.jobTitle}
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                    <Shield className="w-3 h-3 inline mr-1.5" />
                    Premium Member
                  </span>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                    <Check className="w-3 h-3 inline mr-1.5" />
                    Verified Account
                  </span>
                  <span className="px-4 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 rounded-full text-sm font-semibold border border-amber-200">
                    <Star className="w-3 h-3 inline mr-1.5" />
                    Level 3
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!editMode ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/25"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2 border border-gray-200 hover:border-gray-300"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/25 save-success"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2 border border-gray-200 hover:border-gray-300"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
              {statsData.map((stat, index) => (
                <div key={index} className={`p-5 rounded-2xl bg-gradient-to-br ${stat.bg} ${stat.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 ${stat.iconBg} rounded-lg`}>
                      <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                  </div>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs - UPDATED WITH ADDRESS TAB */}
          <div className="border-t border-gray-100">
            <div className="flex overflow-x-auto px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 bg-blue-50/50"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[
                      { icon: User, label: "Full Name", name: "name", value: formData.name },
                      { icon: Mail, label: "Email Address", name: "email", value: formData.email, type: "email" },
                      { icon: Phone, label: "Phone Number", name: "phone", value: formData.phone, type: "tel", placeholder: "+91 98765 43210" },
                      { icon: MapPin, label: "Location", name: "location", value: formData.location, placeholder: "Enter your location" },
                      { icon: Briefcase, label: "Job Title", name: "jobTitle", value: formData.jobTitle, placeholder: "Enter your job title" },
                      { icon: Globe, label: "Website", name: "website", value: formData.website, type: "url", placeholder: "https://yourwebsite.com" }
                    ].map((field) => (
                      <div key={field.name} className="group">
                        <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <field.icon className="w-4 h-4 text-gray-500" />
                          {field.label}
                        </label>
                        {editMode ? (
                          <input
                            type={field.type || "text"}
                            name={field.name}
                            value={field.value}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/50 group-hover:bg-white"
                          />
                        ) : (
                          <div className="px-4 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl text-gray-900 font-semibold border-2 border-transparent group-hover:border-gray-200 transition-all duration-300">
                            {field.value || "Not provided"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      Bio
                    </label>
                    {editMode ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        rows="5"
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 resize-none bg-white/50 hover:bg-white"
                      />
                    ) : (
                      <div className="px-4 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl text-gray-700 font-medium border-2 border-transparent hover:border-gray-200 transition-all duration-300 leading-relaxed">
                        {formData.bio}
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Details */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-purple-600" />
                    Account Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Member Since</p>
                          <p className="text-gray-900 font-bold text-lg">April 2023</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{stats.joinedDays} days active</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Account Type</p>
                          <p className="text-gray-900 font-bold text-lg">Premium</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Full access to all features</p>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                          <Award className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Account Status</p>
                          <p className="text-gray-900 font-bold text-lg">Verified</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Identity verified ✓</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ADDRESS TAB CONTENT */}
            {activeTab === "address" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Home className="w-6 h-6 text-blue-600" />
                    My Addresses
                    <span className="text-sm font-normal text-gray-500">({addresses.length} addresses)</span>
                  </h3>
                  <button
                    onClick={handleAddAddress}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/25 mb-6"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Address
                  </button>
                </div>

                {/* Address Form */}
                {showAddressForm && (
                  <div className="bg-gradient-to-r from-blue-50/50 to-white rounded-2xl border-2 border-blue-100 p-6 mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      {editingAddressId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {editingAddressId ? "Edit Address" : "Add New Address"}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={addressForm.fullName}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={addressForm.phone}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={addressForm.address}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                          required
                          placeholder="House no, Building, Street, Area"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={addressForm.zipCode}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <select
                          name="country"
                          value={addressForm.country}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                        <select
                          name="addressType"
                          value={addressForm.addressType}
                          onChange={handleAddressInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white"
                        >
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="md:col-span-2 flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={addressForm.isDefault}
                          onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 font-medium">Set as default address</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={handleSaveAddress}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/25"
                      >
                        <Save className="w-4 h-4" />
                        {editingAddressId ? "Update Address" : "Save Address"}
                      </button>
                      <button
                        onClick={cancelAddressEdit}
                        className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2 border border-gray-200 hover:border-gray-300"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Address List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div 
                      key={address.id} 
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                        address.isDefault 
                          ? 'border-blue-300 bg-gradient-to-r from-blue-50/80 to-blue-100/50' 
                          : 'border-gray-200 bg-gradient-to-r from-gray-50/50 to-white'
                      }`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-lg ${
                            address.addressType === 'home' ? 'bg-blue-100 text-blue-600' :
                            address.addressType === 'work' ? 'bg-purple-100 text-purple-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {address.addressType === 'home' ? <Home className="w-5 h-5" /> :
                             address.addressType === 'work' ? <Building className="w-5 h-5" /> :
                             <MapPin className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {address.addressType === 'home' ? 'Home Address' : 
                               address.addressType === 'work' ? 'Work Address' : 'Other Address'}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              {address.isDefault && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                  Default
                                </span>
                              )}
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Radio className="w-3 h-3" />
                                Click to select for checkout
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <p className="text-gray-900 font-medium">{address.fullName}</p>
                        <p className="text-gray-600">{address.address}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-gray-600">{address.country}</p>
                        {address.phone && (
                          <p className="text-gray-600 flex items-center gap-2 mt-2">
                            <Phone className="w-4 h-4" />
                            {address.phone}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          {!address.isDefault && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetDefaultAddress(address.id);
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-medium text-sm"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAddress(address);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-medium text-sm flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Select for Checkout
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {addresses.length === 0 && !showAddressForm && (
                  <div className="text-center py-12">
                    <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-gray-700 mb-2">No addresses saved</h4>
                    <p className="text-gray-500 mb-6">Add your first address to make checkout faster</p>
                    <button
                      onClick={handleAddAddress}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/25"
                    >
                      <Plus className="w-4 h-4" />
                      Add Your First Address
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-blue-600" />
                  Security Settings
                </h3>
                
                {/* Password Change Card */}
                <div className="p-6 bg-gradient-to-r from-blue-50/50 to-white rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Key className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Change Password</h4>
                      <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
                    </div>
                  </div>

                  {/* Success Message */}
                  {passwordChanged && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-600" />
                        <p className="text-emerald-700 font-medium">Password changed successfully!</p>
                      </div>
                    </div>
                  )}

                  {/* Password Form */}
                  <div className="space-y-4">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter your current password"
                          className={`w-full px-4 py-3 border-2 ${passwordErrors.currentPassword ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword}</p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter your new password"
                          className={`w-full px-4 py-3 border-2 ${passwordErrors.newPassword ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordErrors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm your new password"
                          className={`w-full px-4 py-3 border-2 ${passwordErrors.confirmPassword ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Password Requirements */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className={`flex items-center gap-2 ${passwordData.newPassword.length >= 6 ? 'text-emerald-600' : ''}`}>
                          <Check className={`w-4 h-4 ${passwordData.newPassword.length >= 6 ? 'text-emerald-600' : 'text-gray-400'}`} />
                          At least 6 characters
                        </li>
                        <li className={`flex items-center gap-2 ${passwordData.newPassword !== passwordData.currentPassword ? 'text-emerald-600' : ''}`}>
                          <Check className={`w-4 h-4 ${passwordData.newPassword !== passwordData.currentPassword ? 'text-emerald-600' : 'text-gray-400'}`} />
                          Different from current password
                        </li>
                        <li className={`flex items-center gap-2 ${passwordData.newPassword === passwordData.confirmPassword && passwordData.confirmPassword ? 'text-emerald-600' : ''}`}>
                          <Check className={`w-4 h-4 ${passwordData.newPassword === passwordData.confirmPassword && passwordData.confirmPassword ? 'text-emerald-600' : 'text-gray-400'}`} />
                          Passwords match
                        </li>
                      </ul>
                    </div>

                    {/* Change Password Button */}
                    <button
                      onClick={changePassword}
                      disabled={changingPassword}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {changingPassword ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Changing Password...
                        </div>
                      ) : (
                        "Change Password"
                      )}
                    </button>
                  </div>
                </div>

                {/* Other Security Options */}
                <div className="space-y-6">
                  {[
                    { 
                      title: "Two-Factor Authentication", 
                      desc: "Add an extra layer of security", 
                      action: "Enable 2FA",
                      icon: ShieldCheck
                    },
                    { 
                      title: "Active Sessions", 
                      desc: "3 devices currently active", 
                      action: "View All",
                      icon: Smartphone
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-6 bg-gradient-to-r from-gray-50/50 to-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                            <item.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium shadow-lg hover:shadow-blue-500/25">
                          {item.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Bell className="w-6 h-6 text-purple-600" />
                  Notification Preferences
                </h3>
                
                <div className="space-y-4">
                  {[
                    { label: "Email Notifications", key: "emailNotifications", desc: "Receive email updates about your account", enabled: settings.emailNotifications },
                    { label: "Order Updates", key: "orderUpdates", desc: "Get notified about order status changes", enabled: settings.orderUpdates },
                    { label: "Security Alerts", key: "securityAlerts", desc: "Important notifications about your account security", enabled: settings.securityAlerts },
                    { label: "Promotional Emails", key: "promotionalEmails", desc: "Receive offers, discounts and promotions", enabled: settings.promotionalEmails },
                    { label: "SMS Notifications", key: "smsNotifications", desc: "Receive text message notifications", enabled: settings.smsNotifications },
                    { label: "Push Notifications", key: "pushNotifications", desc: "Receive push notifications on your devices", enabled: settings.pushNotifications }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50/50 to-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 group">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-gray-900">{item.label}</h4>
                          {item.enabled && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={item.enabled}
                          onChange={() => handleSettingsChange(item.key, !item.enabled)}
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-green-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-gray-600" />
                  Account Settings
                </h3>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-gray-50/50 to-white rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">Language & Region</h4>
                      <button
                        onClick={saveSettings}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-xl font-medium transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        Save Settings
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <select 
                        value={settings.language} 
                        onChange={handleLanguageChange}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white"
                      >
                        <option>English (United States)</option>
                        <option>English (United Kingdom)</option>
                        <option>Español (Spanish)</option>
                        <option>Français (French)</option>
                        <option>Deutsch (German)</option>
                        <option>日本語 (Japanese)</option>
                      </select>
                      <div className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50">
                        <span className="text-sm text-gray-700">Region: {settings.region}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-gray-50/50 to-white rounded-2xl border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Privacy Settings</h4>
                    <div className="space-y-3">
                      {[
                        { label: "Make my profile public", key: "profilePublic", checked: settings.profilePublic },
                        { label: "Show my email to other users", key: "showEmail", checked: settings.showEmail },
                        { label: "Allow search engines to index my profile", key: "allowIndexing", checked: settings.allowIndexing },
                        { label: "Show online status", key: "showOnlineStatus", checked: settings.showOnlineStatus },
                        { label: "Allow friend requests", key: "allowFriendRequests", checked: settings.allowFriendRequests }
                      ].map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50/50 rounded-lg transition-colors cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                            checked={option.checked}
                            onChange={() => handleSettingsChange(option.key, !option.checked)}
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-red-50/50 to-white rounded-2xl border border-red-100 group">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                      ⚠️ Danger Zone
                    </h4>
                    <p className="text-red-700 mb-5">Once you delete your account, there is no going back. Please be certain.</p>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/25"
                    >
                      {isDeleting ? "Click again to confirm" : "Delete Account"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-amber-600" />
                  Recent Activity
                </h3>
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">No recent activity</h4>
                  <p className="text-gray-500">Your activity will appear here as you use the platform</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-success {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1);
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}