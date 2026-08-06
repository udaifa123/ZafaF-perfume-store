import React, { useState } from "react";
import { 
  Briefcase, 
  User, 
  Mail, 
  Phone, 
  Save, 
  Upload,
  Shield,
  CheckCircle,
  Globe,
  Lock,
  Calendar,
  Users,
  Settings,
  Key,
  Clock,
  LogOut,
  Activity,
  Database,
  Network,
  Bell,
  Globe as Earth,
  Cpu,
  Server,
  Zap
} from "lucide-react";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin.@techcorp.com",
    phone: "+1 (415) 867-5309",
    role: "Lead System Administrator",
    department: "Infrastructure & Security",
    bio: "Experienced system administrator with 8+ years specializing in cloud infrastructure, cybersecurity protocols, and DevOps practices. Passionate about building resilient systems and mentoring technical teams.",
    location: "Mumbai",
    timezone: "Pacific Time (UTC-8)",
    employeeId: "TC-ADM-8472",
    joinDate: "March 2018"
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    systemUpdates: true,
    securityAlerts: true,
    weeklyReports: false,
    teamActivity: true
  });

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const performanceStats = [
    { label: "System Uptime", value: "99.98%", icon: <Server className="w-4 h-4" />, trend: "+0.2%" },
    { label: "Active Projects", value: "8", icon: <Briefcase className="w-4 h-4" />, trend: "-2" },
    { label: "Team Size", value: "16", icon: <Users className="w-4 h-4" />, trend: "+3" },
    { label: "Response Time", value: "45ms", icon: <Zap className="w-4 h-4" />, trend: "-5ms" },
    { label: "Security Score", value: "9.8/10", icon: <Shield className="w-4 h-4" />, trend: "+0.3" },
    { label: "Data Centers", value: "3", icon: <Database className="w-4 h-4" />, trend: "0" }
  ];

  const recentActivities = [
    { time: "Today, 09:42", action: "Updated firewall rules", icon: <Shield className="w-4 h-4" />, type: "security" },
    { time: "Today, 08:15", action: "Deployed production update", icon: <Cpu className="w-4 h-4" />, type: "deployment" },
    { time: "Yesterday", action: "Team performance review", icon: <Users className="w-4 h-4" />, type: "management" },
    { time: "2 days ago", action: "Infrastructure audit", icon: <Activity className="w-4 h-4" />, type: "audit" },
    { time: "1 week ago", action: "Security training session", icon: <Lock className="w-4 h-4" />, type: "training" }
  ];

  const accessLevels = [
    { name: "Full System Access", level: 100, icon: <Key className="w-4 h-4" />, color: "from-emerald-500 to-teal-500" },
    { name: "Database Admin", level: 90, icon: <Database className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" },
    { name: "Network Control", level: 85, icon: <Network className="w-4 h-4" />, color: "from-purple-500 to-indigo-500" },
    { name: "Security Config", level: 95, icon: <Shield className="w-4 h-4" />, color: "from-amber-500 to-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <User className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Administrator Profile
                </h1>
                <p className="text-slate-400 mt-2">Manage your profile, security settings, and system preferences</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-blue-400">Tier 4 Access</div>
                  <div className="text-xs text-slate-400">Elevated Privileges</div>
                </div>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/30 rounded-2xl border border-slate-700/50 transition-all duration-300">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {performanceStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-slate-800/50 rounded-lg group-hover:bg-slate-800/70 transition-colors">
                    <div className="text-blue-400">{stat.icon}</div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">
                    {stat.trend}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-900/20 to-emerald-800/10 border border-emerald-700/30 rounded-2xl flex items-center gap-4 animate-fade-in backdrop-blur-sm">
            <div className="p-2 bg-emerald-900/40 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="text-emerald-400 font-medium">Profile updated successfully</div>
              <div className="text-sm text-emerald-300/70">All changes have been synchronized across systems</div>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="text-emerald-300/70 hover:text-emerald-400 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-slate-800/30 to-slate-900/30 backdrop-blur-sm rounded-3xl border border-slate-700/30 p-6 sticky top-8 shadow-xl">
              {/* Profile Image */}
              <div className="relative mb-8">
                <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700/50 shadow-2xl overflow-hidden group relative">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="relative">
                        <User className="w-24 h-24 text-slate-600" />
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Online Status */}
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse ring-2 ring-emerald-400/30 ring-offset-2 ring-offset-slate-900"></div>
                  </div>
                </div>
                
                {/* Upload Button */}
                <label className="absolute bottom-4 right-1/2 transform translate-x-1/2 cursor-pointer">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 group shadow-blue-500/25">
                    <Upload className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {/* User Info */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">{profile.name}</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full border border-blue-500/20 mb-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 font-medium text-sm">{profile.role}</span>
                </div>
                <p className="text-slate-400 text-sm">{profile.department}</p>
                <div className="mt-4 text-xs text-slate-500">
                  Employee ID: <span className="text-slate-300">{profile.employeeId}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 p-3 bg-slate-800/20 rounded-xl hover:bg-slate-800/30 transition-colors">
                  <div className="p-2 bg-slate-800/40 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">Email</div>
                    <div className="text-white text-sm truncate">{profile.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/20 rounded-xl hover:bg-slate-800/30 transition-colors">
                  <div className="p-2 bg-slate-800/40 rounded-lg">
                    <Earth className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">Location & Timezone</div>
                    <div className="text-white text-sm">{profile.location}</div>
                    <div className="text-xs text-slate-500">{profile.timezone}</div>
                  </div>
                </div>
              </div>

              {/* Join Date */}
              <div className="p-4 bg-gradient-to-r from-slate-800/20 to-slate-900/20 rounded-2xl border border-slate-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Member since</div>
                    <div className="text-white font-medium">{profile.joinDate}</div>
                  </div>
                  <div className="text-2xl text-blue-400 font-bold">4+</div>
                </div>
                <div className="text-xs text-slate-500 mt-2">years of service</div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex space-x-1 p-1 bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-700/30 mb-8 shadow-inner">
              {[
                { id: "personal", label: "Personal", icon: User },
                { id: "security", label: "Security", icon: Lock },
                { id: "preferences", label: "Preferences", icon: Settings },
                { id: "activity", label: "Activity", icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/30 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Personal Information Tab */}
            {activeTab === "personal" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-b from-slate-800/20 to-slate-900/20 backdrop-blur-sm rounded-3xl border border-slate-700/30 overflow-hidden shadow-xl">
                  <div className="px-8 py-6 border-b border-slate-700/30 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <User className="w-5 h-5 text-blue-400" />
                      </div>
                      Personal Information
                    </h3>
                    <p className="text-slate-400 text-sm mt-2">Update your personal details and contact information</p>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-400" />
                          </div>
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-5 py-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 text-white placeholder-slate-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-blue-400" />
                          </div>
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-5 py-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 text-white placeholder-slate-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-blue-400" />
                          </div>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-5 py-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 text-white placeholder-slate-500 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                          Department
                        </label>
                        <select
                          value={profile.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className="w-full px-5 py-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 text-white transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                        >
                          <option value="Infrastructure & Security">Infrastructure & Security</option>
                          <option value="Cloud Operations">Cloud Operations</option>
                          <option value="DevOps Engineering">DevOps Engineering</option>
                          <option value="Network Administration">Network Administration</option>
                          <option value="Database Management">Database Management</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">
                        Professional Bio
                      </label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows="4"
                        className="w-full px-5 py-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 text-white placeholder-slate-500 transition-all duration-300 backdrop-blur-sm resize-none"
                        placeholder="Describe your professional expertise and responsibilities..."
                      />
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-slate-700/30">
                      <div className="text-sm text-slate-400">
                        Last updated: Today, 10:24 AM
                      </div>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
                          isSaving
                            ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-blue-500/25 hover:shadow-xl'
                        }`}
                      >
                        {isSaving ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving Changes...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Update Profile
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Access Levels */}
                <div className="bg-gradient-to-b from-slate-800/20 to-slate-900/20 backdrop-blur-sm rounded-3xl border border-slate-700/30 p-8 shadow-xl">
                  <h4 className="font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Key className="w-5 h-5 text-blue-400" />
                    </div>
                    Access Privileges & Permissions
                  </h4>
                  <div className="space-y-6">
                    {accessLevels.map((access, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-gradient-to-br ${access.color}/20 rounded-lg border ${access.color.split(' ')[1].replace('to-', 'border-')}/20`}>
                              <div className={access.color.replace('from-', 'text-').split(' ')[0].replace('to-', 'text-').split('-500')[0] + '-400'}>
                                {access.icon}
                              </div>
                            </div>
                            <span className="text-white text-sm font-medium">{access.name}</span>
                          </div>
                          <div className="text-sm text-slate-300">{access.level}%</div>
                        </div>
                        <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${access.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${access.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="bg-gradient-to-b from-slate-800/20 to-slate-900/20 backdrop-blur-sm rounded-3xl border border-slate-700/30 p-8 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  Recent Activity Log
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 bg-slate-800/20 rounded-2xl border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300 group"
                    >
                      <div className={`p-3 rounded-xl ${
                        activity.type === 'security' ? 'bg-red-500/10' :
                        activity.type === 'deployment' ? 'bg-green-500/10' :
                        activity.type === 'management' ? 'bg-purple-500/10' :
                        activity.type === 'audit' ? 'bg-amber-500/10' :
                        'bg-blue-500/10'
                      }`}>
                        <div className={`${
                          activity.type === 'security' ? 'text-red-400' :
                          activity.type === 'deployment' ? 'text-green-400' :
                          activity.type === 'management' ? 'text-purple-400' :
                          activity.type === 'audit' ? 'text-amber-400' :
                          'text-blue-400'
                        }`}>
                          {activity.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{activity.action}</div>
                        <div className="text-sm text-slate-400">{activity.time}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        activity.type === 'security' ? 'bg-red-500/20 text-red-400' :
                        activity.type === 'deployment' ? 'bg-green-500/20 text-green-400' :
                        activity.type === 'management' ? 'bg-purple-500/20 text-purple-400' :
                        activity.type === 'audit' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {activity.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="bg-gradient-to-b from-slate-800/20 to-slate-900/20 backdrop-blur-sm rounded-3xl border border-slate-700/30 p-8 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Settings className="w-5 h-5 text-blue-400" />
                  </div>
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="flex items-center justify-between p-4 bg-slate-800/20 rounded-2xl border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-800/40 rounded-lg">
                          <Bell className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm text-slate-400">
                            {key.includes('Alerts') ? 'Real-time notifications' : 
                             key.includes('Updates') ? 'System maintenance alerts' :
                             key.includes('Reports') ? 'Weekly summary emails' :
                             'Team collaboration updates'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotification(key)}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          value ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-slate-700'
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${
                          value ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <div>
              {/* © 2024 TechCorp Systems. All rights reserved. */}
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                System Status: Operational
              </span>
              <span>Version 3.2.1</span>
              <span>Last sync: Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}