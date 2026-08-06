import  { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CreditCard,
  Bell,
  Lock,
  Palette,
  Mail,
  Shield,
  Truck,
  Percent,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  RefreshCw,
  Server,
  ShieldCheck,
  AlertTriangle,
  BellRing,
  Key,
  Package,
  Tag
} from "lucide-react";
import { successAlert, errorAlert } from "../../utils/alert";

export default function AdminSettings() {
  // Store Settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: "ZafaF PERFUME",
    storeEmail: "admin@gmail.com",
    storePhone: "+91 98765 43210",
    storeAddress: "123 Business Street, Mumbai, India",
    currency: "INR",
    timezone: "Asia/Kolkata",
    language: "en",
    maintenanceMode: false
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    razorpayKey: "",
    razorpaySecret: "",
    stripeKey: "",
    stripeSecret: "",
    paypalClientId: "",
    cashOnDelivery: true,
    enableRazorpay: true,
    enableStripe: false,
    enablePayPal: false
  });

  // Shipping Settings
  const [shippingSettings, setShippingSettings] = useState({
    shippingEnabled: true,
    freeShippingThreshold: 999,
    standardShippingRate: 49,
    expressShippingRate: 149,
    shippingCountries: ["IN", "US", "UK", "CA", "AU"],
    estimatedDeliveryDays: "3-7"
  });

  // Tax Settings
  const [taxSettings, setTaxSettings] = useState({
    gstEnabled: true,
    gstRate: 18,
    igstEnabled: true,
    cgstEnabled: true,
    sgstEnabled: true,
    taxInclusive: true
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    marketingEmails: false,
    lowStockAlerts: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAttempts: 5,
    sessionTimeout: 30,
    ipWhitelist: [],
    passwordExpiry: 90,
    sslEnabled: true
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "dark",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    fontFamily: "Inter",
    borderRadius: "0.75rem",
    enableAnimations: true
  });

  // API Settings
  const [apiSettings, setApiSettings] = useState({
    apiEnabled: true,
    rateLimit: 100,
    corsEnabled: true,
    webhookUrl: "",
    enableLogging: true
  });

  // Advanced Settings
  const [advancedSettings, setAdvancedSettings] = useState({
    cacheEnabled: true,
    cdnEnabled: false,
    imageOptimization: true,
    seoOptimized: true,
    backupFrequency: "daily",
    enableDebug: false
  });

  // const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showSecretKeys, setShowSecretKeys] = useState({});
  const [saving, setSaving] = useState(false);

  // Load settings on component mount
  useEffect(() => {
    // In real app, fetch from API
    const savedSettings = localStorage.getItem("adminSettings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      // Update each settings object with saved data
      Object.keys(parsed).forEach(key => {
        if (key === "storeSettings") setStoreSettings(parsed[key]);
        if (key === "paymentSettings") setPaymentSettings(parsed[key]);
        if (key === "shippingSettings") setShippingSettings(parsed[key]);
        if (key === "taxSettings") setTaxSettings(parsed[key]);
        if (key === "notificationSettings") setNotificationSettings(parsed[key]);
        if (key === "securitySettings") setSecuritySettings(parsed[key]);
        if (key === "appearanceSettings") setAppearanceSettings(parsed[key]);
        if (key === "apiSettings") setApiSettings(parsed[key]);
        if (key === "advancedSettings") setAdvancedSettings(parsed[key]);
      });
    }
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Save all settings to localStorage (in real app, send to API)
      const allSettings = {
        storeSettings,
        paymentSettings,
        shippingSettings,
        taxSettings,
        notificationSettings,
        securitySettings,
        appearanceSettings,
        apiSettings,
        advancedSettings
      };
      
      localStorage.setItem("adminSettings", JSON.stringify(allSettings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      successAlert("Settings Saved", "All settings have been saved successfully!");
    } catch (err) {
      errorAlert("Save Failed", "Failed to save settings. Please try again.",err);
    } finally {
      setSaving(false);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm("Are you sure you want to reset all settings to default?")) {
      // Reset to default values
      setStoreSettings({
        storeName: "ZafaF PERFUME",
        storeEmail: "admin@gmail.com",
        storePhone: "+91 98765 43210",
        storeAddress: "123 Business Street, Mumbai, India",
        currency: "INR",
        timezone: "Asia/Kolkata",
        language: "en",
        maintenanceMode: false
      });
      
      localStorage.removeItem("adminSettings");
      successAlert("Settings Reset", "All settings have been reset to default values.");
    }
  };

  const toggleSecretKey = (key) => {
    setShowSecretKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // const formatCurrency = (amount) => {
  //   return new Intl.NumberFormat('en-IN', {
  //     style: 'currency',
  //     currency: storeSettings.currency,
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0
  //   }).format(amount);
  // };

  const settingsTabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "tax", label: "Tax", icon: Percent },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    // { id: "api", label: "API", icon: Database },
    { id: "advanced", label: "Advanced", icon: Server }
  ];

  return (
    <div className="min-h-screen bg-gray-900 via-black to-gray-900">
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                Store Settings
              </h1>
              <p className="text-gray-400">
                Configure your store settings, preferences, and integrations
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleResetSettings}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-300 rounded-xl hover:bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 font-medium"
              >
                <RefreshCw size={18} />
                Reset to Default
              </button>
              
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save All Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Container */}
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-700/50">
            {settingsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-purple-400 bg-purple-500/10 border-b-2 border-purple-400"
                    : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="ml-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Store Name *
                    </label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, storeName: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                      placeholder="Enter store name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Store Email *
                    </label>
                    <input
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                      placeholder="contact@store.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={storeSettings.storePhone}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, storePhone: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={storeSettings.currency}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 appearance-none"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                      <option value="JPY">Japanese Yen (¥)</option>
                      <option value="AUD">Australian Dollar (A$)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={storeSettings.timezone}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 appearance-none"
                    >
                      <option value="Asia/Kolkata">IST (India)</option>
                      <option value="America/New_York">EST (New York)</option>
                      <option value="Europe/London">GMT (London)</option>
                      <option value="America/Los_Angeles">PST (Los Angeles)</option>
                      <option value="Asia/Tokyo">JST (Tokyo)</option>
                      <option value="Australia/Sydney">AEST (Sydney)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={storeSettings.language}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 appearance-none"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Store Address
                  </label>
                  <textarea
                    value={storeSettings.storeAddress}
                    onChange={(e) => setStoreSettings(prev => ({ ...prev, storeAddress: e.target.value }))}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 resize-none"
                    placeholder="Enter full store address"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Maintenance Mode</p>
                      <p className="text-sm text-gray-400">Temporarily disable store for maintenance</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={storeSettings.maintenanceMode}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, maintenanceMode: e.target.checked }))}
                      className="sr-only peer" 
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-600"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      Razorpay Key ID
                      <Key className="w-3 h-3 text-gray-400" />
                    </label>
                    <div className="relative">
                      <input
                        type={showSecretKeys.razorpayKey ? "text" : "password"}
                        value={paymentSettings.razorpayKey}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, razorpayKey: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 pr-12"
                        placeholder="rzp_test_xxxxxxxxxxxx"
                      />
                      <button
                        type="button"
                        onClick={() => toggleSecretKey("razorpayKey")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showSecretKeys.razorpayKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      Razorpay Key Secret
                      <Key className="w-3 h-3 text-gray-400" />
                    </label>
                    <div className="relative">
                      <input
                        type={showSecretKeys.razorpaySecret ? "text" : "password"}
                        value={paymentSettings.razorpaySecret}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, razorpaySecret: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 pr-12"
                        placeholder="xxxxxxxxxxxxxxxxxxxx"
                      />
                      <button
                        type="button"
                        onClick={() => toggleSecretKey("razorpaySecret")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showSecretKeys.razorpaySecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4">Payment Methods</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Razorpay</p>
                          <p className="text-sm text-gray-400">Online payments via cards, UPI, netbanking</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={paymentSettings.enableRazorpay}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, enableRazorpay: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                          <CreditCard className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Stripe</p>
                          <p className="text-sm text-gray-400">International card payments</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={paymentSettings.enableStripe}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, enableStripe: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                          <CreditCard className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">PayPal</p>
                          <p className="text-sm text-gray-400">International PayPal payments</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={paymentSettings.enablePayPal}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, enablePayPal: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                          <Package className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Cash on Delivery</p>
                          <p className="text-sm text-gray-400">Pay when you receive the order</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={paymentSettings.cashOnDelivery}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, cashOnDelivery: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Settings */}
            {activeTab === "shipping" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Truck className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Enable Shipping</p>
                      <p className="text-sm text-gray-400">Allow customers to ship products</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={shippingSettings.shippingEnabled}
                      onChange={(e) => setShippingSettings(prev => ({ ...prev, shippingEnabled: e.target.checked }))}
                      className="sr-only peer" 
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600"></div>
                  </label>
                </div>

                {shippingSettings.shippingEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Free Shipping Threshold
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {storeSettings.currency === "INR" ? "₹" : "$"}
                        </span>
                        <input
                          type="number"
                          value={shippingSettings.freeShippingThreshold}
                          onChange={(e) => setShippingSettings(prev => ({ ...prev, freeShippingThreshold: Number(e.target.value) }))}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                          placeholder="999"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Standard Shipping Rate
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {storeSettings.currency === "INR" ? "₹" : "$"}
                        </span>
                        <input
                          type="number"
                          value={shippingSettings.standardShippingRate}
                          onChange={(e) => setShippingSettings(prev => ({ ...prev, standardShippingRate: Number(e.target.value) }))}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                          placeholder="49"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Express Shipping Rate
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {storeSettings.currency === "INR" ? "₹" : "$"}
                        </span>
                        <input
                          type="number"
                          value={shippingSettings.expressShippingRate}
                          onChange={(e) => setShippingSettings(prev => ({ ...prev, expressShippingRate: Number(e.target.value) }))}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                          placeholder="149"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Estimated Delivery Days
                      </label>
                      <input
                        type="text"
                        value={shippingSettings.estimatedDeliveryDays}
                        onChange={(e) => setShippingSettings(prev => ({ ...prev, estimatedDeliveryDays: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                        placeholder="3-7 days"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tax Settings */}
            {activeTab === "tax" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Percent className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Enable GST</p>
                        <p className="text-sm text-gray-400">Apply Goods and Services Tax</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={taxSettings.gstEnabled}
                        onChange={(e) => setTaxSettings(prev => ({ ...prev, gstEnabled: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-purple-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GST Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={taxSettings.gstRate}
                        onChange={(e) => setTaxSettings(prev => ({ ...prev, gstRate: Number(e.target.value) }))}
                        disabled={!taxSettings.gstEnabled}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="18"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                    </div>
                  </div>
                </div>

                {taxSettings.gstEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={taxSettings.cgstEnabled}
                        onChange={(e) => setTaxSettings(prev => ({ ...prev, cgstEnabled: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                      <span className="text-white">CGST (50%)</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={taxSettings.sgstEnabled}
                        onChange={(e) => setTaxSettings(prev => ({ ...prev, sgstEnabled: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                      <span className="text-white">SGST (50%)</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={taxSettings.igstEnabled}
                        onChange={(e) => setTaxSettings(prev => ({ ...prev, igstEnabled: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                      <span className="text-white">IGST (100%)</span>
                    </label>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Tag className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Tax Inclusive Pricing</p>
                      <p className="text-sm text-gray-400">Include tax in displayed prices</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={taxSettings.taxInclusive}
                      onChange={(e) => setTaxSettings(prev => ({ ...prev, taxInclusive: e.target.checked }))}
                      className="sr-only peer" 
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-green-600"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">Notification Preferences</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive email updates</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <BellRing className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">SMS Notifications</p>
                        <p className="text-sm text-gray-400">Receive text message alerts</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Bell className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Push Notifications</p>
                        <p className="text-sm text-gray-400">Browser push notifications</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-white mb-3">Order Notifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderConfirmation}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, orderConfirmation: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                      <span className="text-white">Order Confirmation</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderShipped}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, orderShipped: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                      <span className="text-white">Order Shipped</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderDelivered}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, orderDelivered: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                      <span className="text-white">Order Delivered</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.lowStockAlerts}
                        onChange={(e) => setNotificationSettings(prev => ({ ...prev, lowStockAlerts: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500/20"
                      />
                      <span className="text-white">Low Stock Alerts</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-400">Add extra security layer</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-green-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Failed Login Attempts
                    </label>
                    <input
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAttempts: Number(e.target.value) }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordExpiry: Number(e.target.value) }))}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all duration-300"
                      placeholder="90"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    SSL Certificate
                  </label>
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 ${securitySettings.sslEnabled ? 'bg-emerald-500/10' : 'bg-red-500/10'} rounded-lg`}>
                        {securitySettings.sslEnabled ? 
                          <CheckCircle className="w-5 h-5 text-emerald-400" /> : 
                          <XCircle className="w-5 h-5 text-red-400" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {securitySettings.sslEnabled ? "SSL Certificate Active" : "SSL Certificate Inactive"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {securitySettings.sslEnabled ? 
                            "Your connection is secure" : 
                            "Enable SSL for secure connections"
                          }
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={securitySettings.sslEnabled}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, sslEnabled: e.target.checked }))}
                        className="sr-only peer" 
                      />
                      <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs will follow similar pattern */}
            
            {/* Save Button at Bottom */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Save All Settings
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Settings last saved: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}