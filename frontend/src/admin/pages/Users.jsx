import { useEffect, useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  User, 
  Mail, 
  Shield, 
  ShieldOff,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Eye,
  Edit3,
  UserPlus,
  Calendar,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import API from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (id) => {
    try {
      await API.put(`/admin/users/${id}/block`);
      fetchUsers();
      setActiveMenu(null);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unblockUser = async (id) => {
    try {
      await API.put(`/admin/users/${id}/unblock`);
      fetchUsers();
      setActiveMenu(null);
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await API.delete(`/admin/users/${id}`);
        fetchUsers();
        setActiveMenu(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
    setActiveMenu(null);
  };

  const handleBulkBlock = async () => {
    if (selectedUsers.length === 0) return;
    
    if (window.confirm(`Are you sure you want to block ${selectedUsers.length} user(s)?`)) {
      try {
        await Promise.all(
          selectedUsers.map(id => API.put(`/admin/users/${id}/block`))
        );
        fetchUsers();
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error bulk blocking users:", error);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)? This action cannot be undone.`)) {
      try {
        await Promise.all(
          selectedUsers.map(id => API.delete(`/admin/users/${id}`))
        );
        fetchUsers();
        setSelectedUsers([]);
      } catch (error) {
        console.error("Error bulk deleting users:", error);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && !user.isBlocked) ||
                         (statusFilter === "blocked" && user.isBlocked);
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc"
    }));
  };

  const toggleSelectUser = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id)
        : [...prev, id]
    );
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user._id));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return formatDate(dateString);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-menu') && !e.target.closest('.menu-button')) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400 mt-1">Manage and monitor all user accounts</p>
            </div>
            <button
              onClick={fetchUsers}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:bg-gray-800 transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-white mt-1">{users.length}</p>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <User className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {users.filter(u => !u.isBlocked).length}
                </p>
              </div>
              <div className="p-3 bg-green-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Blocked Users</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {users.filter(u => u.isBlocked).length}
                </p>
              </div>
              <div className="p-3 bg-red-900/30 rounded-lg">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">New Today</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {users.filter(u => {
                    const today = new Date().toDateString();
                    const userDate = new Date(u.createdAt).toDateString();
                    return userDate === today;
                  }).length}
                </p>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <UserPlus className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="blocked">Blocked Only</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
              </div>

              <button className="inline-flex items-center px-4 py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-all">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>

              <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-900/30 rounded-lg mr-3">
                    <AlertCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                    </p>
                    <p className="text-sm text-gray-400">Perform bulk actions on selected users</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleBulkBlock}
                    className="px-4 py-2 border border-orange-700 rounded-lg text-orange-400 hover:bg-orange-900/30 transition-all"
                  >
                    Block Selected
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 border border-red-700 rounded-lg text-red-400 hover:bg-red-900/30 transition-all"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={() => setSelectedUsers([])}
                    className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-all"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={selectAllUsers}
                        className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-800"
                      />
                    </th>
                    <th 
                      className="py-4 px-6 text-left text-sm font-semibold text-white cursor-pointer hover:bg-gray-800 transition-colors"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        User
                        {sortConfig.key === "name" && (
                          sortConfig.direction === "asc" ? 
                            <ChevronUp className="w-4 h-4 ml-1" /> : 
                            <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="py-4 px-6 text-left text-sm font-semibold text-white cursor-pointer hover:bg-gray-800 transition-colors"
                      onClick={() => handleSort("email")}
                    >
                      <div className="flex items-center">
                        Email
                        {sortConfig.key === "email" && (
                          sortConfig.direction === "asc" ? 
                            <ChevronUp className="w-4 h-4 ml-1" /> : 
                            <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white">Joined</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center">
                        <div className="flex flex-col items-center">
                          <User className="w-12 h-12 text-gray-700 mb-3" />
                          <p className="text-gray-400 text-lg font-medium">No users found</p>
                          <p className="text-gray-500 mt-1">
                            {searchTerm ? "Try a different search term" : "No users available"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr 
                        key={user._id} 
                        className="hover:bg-gray-800 transition-colors duration-150"
                      >
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user._id)}
                            onChange={() => toggleSelectUser(user._id)}
                            className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-gray-800"
                          />
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-full flex items-center justify-center mr-3">
                              {user.avatar ? (
                                <img 
                                  src={user.avatar} 
                                  alt={user.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              ) : (
                                <User className="w-5 h-5 text-blue-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-white">{user.name}</p>
                              <p className="text-sm text-gray-400">ID: {user._id.slice(-8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-300">{user.email}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="text-gray-300 text-sm">
                              {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {user.createdAt ? formatTimeAgo(user.createdAt) : ''}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            user.isBlocked 
                              ? 'bg-red-900/30 text-red-400' 
                              : 'bg-green-900/30 text-green-400'
                          }`}>
                            {user.isBlocked ? (
                              <>
                                <ShieldOff className="w-3 h-3 mr-1" />
                                Blocked
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Active
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-900/30 text-blue-400 hover:bg-blue-800/50 border border-blue-800/50 transition-all"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </button>

                            <button
                              onClick={() => user.isBlocked ? unblockUser(user._id) : blockUser(user._id)}
                              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                user.isBlocked
                                  ? 'bg-green-900/30 text-green-400 hover:bg-green-800/50 border border-green-800/50'
                                  : 'bg-orange-900/30 text-orange-400 hover:bg-orange-800/50 border border-orange-800/50'
                              }`}
                            >
                              {user.isBlocked ? (
                                <>
                                  <Shield className="w-3 h-3 mr-1" />
                                  Unblock
                                </>
                              ) : (
                                <>
                                  <ShieldOff className="w-3 h-3 mr-1" />
                                  Block
                                </>
                              )}
                            </button>

                            <div className="relative">
                              <button
                                className="menu-button p-1.5 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                                onClick={() => setActiveMenu(activeMenu === user._id ? null : user._id)}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {activeMenu === user._id && (
                                <div className="dropdown-menu absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
                                  <div className="py-1">
                                    {/* <button
                                      onClick={() => handleViewUser(user)}
                                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                      <Eye className="w-4 h-4 mr-3" />
                                      View Details
                                    </button> */}
                                    {/* <button
                                      onClick={() => {
                                        // Edit functionality
                                        setActiveMenu(null);
                                      }}
                                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                      <Edit3 className="w-4 h-4 mr-3" />
                                      Edit User
                                    </button> */}
                                    {/* <div className="border-t border-gray-700 my-1"></div>
                                    <button
                                      onClick={() => user.isBlocked ? unblockUser(user._id) : blockUser(user._id)}
                                      className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors ${
                                        user.isBlocked
                                          ? 'text-green-400 hover:bg-gray-700'
                                          : 'text-orange-400 hover:bg-gray-700'
                                      }`}
                                    >
                                      {user.isBlocked ? (
                                        <>
                                          <Shield className="w-4 h-4 mr-3" />
                                          Unblock User
                                        </>
                                      ) : (
                                        <>
                                          <ShieldOff className="w-4 h-4 mr-3" />
                                          Block User
                                        </>
                                      )}
                                    </button> */}
                                    <button
                                      onClick={() => deleteUser(user._id)}
                                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Delete User
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {filteredUsers.length > 0 && (
            <div className="border-t border-gray-800 px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="text-sm text-gray-400 mb-2 sm:mb-0">
                  Showing <span className="font-semibold text-white">{filteredUsers.length}</span> of{" "}
                  <span className="font-semibold text-white">{users.length}</span> users
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">
                    1-{filteredUsers.length} of {users.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center">
                <div className="p-2 bg-blue-900/30 rounded-lg mr-3">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">User Details</h2>
                  <p className="text-sm text-gray-400">Complete information about the user</p>
                </div>
              </div>
              <button
                onClick={() => setShowUserDetails(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* User Header */}
              <div className="flex items-center mb-8 pb-6 border-b border-gray-800">
                <div className="flex-shrink-0 h-20 w-20 bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-full flex items-center justify-center mr-4">
                  {selectedUser.avatar ? (
                    <img 
                      src={selectedUser.avatar} 
                      alt={selectedUser.name}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-blue-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedUser.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedUser.isBlocked 
                        ? 'bg-red-900/30 text-red-400' 
                        : 'bg-green-900/30 text-green-400'
                    }`}>
                      {selectedUser.isBlocked ? (
                        <>
                          <ShieldOff className="w-3 h-3 mr-1" />
                          Blocked
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </>
                      )}
                    </span>
                    <span className="mx-3 text-gray-700">•</span>
                    <span className="text-sm text-gray-400">ID: {selectedUser._id}</span>
                  </div>
                </div>
              </div>

              {/* User Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </div>
                    <p className="text-white">{selectedUser.email}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number
                    </div>
                    <p className="text-white">{selectedUser.phone || 'Not provided'}</p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </div>
                    <p className="text-white">{selectedUser.location || 'Not specified'}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      Account Created
                    </div>
                    <p className="text-white">{formatDate(selectedUser.createdAt)}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {formatTimeAgo(selectedUser.createdAt)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      Last Active
                    </div>
                    <p className="text-white">
                      {selectedUser.lastActive ? formatDate(selectedUser.lastActive) : 'Never'}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                      <User className="w-4 h-4 mr-2" />
                      Role
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                      {selectedUser.role || 'User'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {selectedUser.bio && (
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">About</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedUser.bio}</p>
                </div>
              )}

              {/* Stats */}
              {/* <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-400">Orders</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {selectedUser.orderCount || 0}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-400">Reviews</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {selectedUser.reviewCount || 0}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${selectedUser.totalSpent || '0.00'}
                  </p>
                </div>
              </div> */}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-800 p-6">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="px-5 py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-all"
                >
                  Close
                </button>
                {/* <button
                  onClick={() => selectedUser.isBlocked ? unblockUser(selectedUser._id) : blockUser(selectedUser._id)}
                  className={`px-5 py-2.5 rounded-lg text-white transition-all ${
                    selectedUser.isBlocked
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  {selectedUser.isBlocked ? 'Unblock User' : 'Block User'}
                </button> */}
                {/* <button
                  onClick={() => {
                    deleteUser(selectedUser._id);
                    setShowUserDetails(false);
                  }}
                  className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete User
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}