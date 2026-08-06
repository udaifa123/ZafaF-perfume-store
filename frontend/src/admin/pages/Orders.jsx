import React, { useEffect, useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  EyeOff,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Package,
  Truck,
  ShoppingBag,
  Clock,
  ChevronDown,
  User,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  X,
  ChevronRight,
  DollarSign,
  IndianRupee
} from "lucide-react";
import API from "../../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

 const fetchOrders = async () => {
  setLoading(true);
  try {
    const res = await API.get("/admin/orders");
    console.log("Orders fetched:", res.data);

    let ordersData = res.data || [];

    // ✅ Normalize orders so shipping, phone, and items always exist
    const normalizedOrders = ordersData.map(order => {
      return {
        ...order,
        // Ensure shippingAddress exists
        shippingAddress: order.shippingAddress || order.address || order.deliveryAddress || null,
        // Ensure orderItems exists
        orderItems: order.orderItems || order.items || order.cartItems || [],
        // Ensure phone exists
        user: {
          ...order.user,
          phone: order.user?.phone || order.shippingAddress?.phone || order.shippingAddress?.mobile || order.phone || null
        }
      };
    });

    setOrders(normalizedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    alert("Error loading orders");
  } finally {
    setLoading(false);
  }
};


  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}/status`, { status });
      // Update local state immediately
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating order status");
    }
  };

  // const deleteOrder = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
  //     return;
  //   }

  //   try {
  //     console.log("Deleting order with ID:", id);
  //     await API.delete(`/admin/orders/${id}`);
      
  //     // Remove from local state immediately
  //     setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
      
  //     // Close expanded view if it's the deleted order
  //     if (expandedOrder === id) {
  //       setExpandedOrder(null);
  //     }
      
  //     alert("Order deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //     const errorMessage = error.response?.data?.message || "Failed to delete order. Please try again.";
  //     alert(errorMessage);
  //   }
  // };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-900/30 text-yellow-400 border-yellow-800",
      Processing: "bg-blue-900/30 text-blue-400 border-blue-800",
      Shipped: "bg-purple-900/30 text-purple-400 border-purple-800",
      Delivered: "bg-green-900/30 text-green-400 border-green-800",
      Cancelled: "bg-red-900/30 text-red-400 border-red-800",
      Failed: "bg-gray-800 text-gray-400 border-gray-700"
    };
    return colors[status] || "bg-gray-800 text-gray-400 border-gray-700";
  };

  const getStatusIcon = (status) => {
    const icons = {
      Pending: <Clock className="w-3 h-3 mr-1" />,
      Processing: <Package className="w-3 h-3 mr-1" />,
      Shipped: <Truck className="w-3 h-3 mr-1" />,
      Delivered: <CheckCircle className="w-3 h-3 mr-1" />,
      Cancelled: <XCircle className="w-3 h-3 mr-1" />,
    };
    return icons[status] || <Clock className="w-3 h-3 mr-1" />;
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      order._id?.toLowerCase().includes(searchLower) ||
      (order.user?.name && order.user.name.toLowerCase().includes(searchLower)) ||
      (order.user?.email && order.user.email.toLowerCase().includes(searchLower)) ||
      (order.shippingAddress?.address && order.shippingAddress.address.toLowerCase().includes(searchLower));
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
 const calculateStats = () => {
  const total = orders.length;
  const pending = orders.filter(o => o.status === 'Pending').length;
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const shipped = orders.filter(o => o.status === 'Shipped').length;
  const cancelled = orders.filter(o => o.status === 'Cancelled').length; // <-- added
  const revenue = orders
    .filter(o => o.status === 'Delivered')
    .reduce((sum, o) => sum + (parseFloat(o.totalPrice) || 0), 0);

  return { total, pending, delivered, shipped, cancelled, revenue };
};



  const stats = calculateStats();

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '₹0.00';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date',error;
    }
  };

  const calculateOrderTotal = (order) => {
    // First check if totalPrice exists
    if (order.totalPrice !== undefined && order.totalPrice !== null) {
      return parseFloat(order.totalPrice);
    }
    
    // Then check if total exists
    if (order.total !== undefined && order.total !== null) {
      return parseFloat(order.total);
    }
    
    // Calculate from order items if totalPrice doesn't exist
    if (order.orderItems && order.orderItems.length > 0) {
      return order.orderItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        return sum + (price * quantity);
      }, 0);
    }
    
    return 0;
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Order Management</h1>
              <p className="text-gray-400 mt-1">Manage and track customer orders</p>
            </div>
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:bg-gray-800 transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Delivered</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.delivered}</p>
              </div>
              <div className="p-3 bg-green-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-400">Cancelled Orders</p>
      <p className="text-2xl font-bold text-white mt-1">{stats.cancelled}</p>
    </div>
    <div className="p-3 bg-red-900/30 rounded-lg">
      <XCircle className="w-6 h-6 text-red-400" />
    </div>
  </div>
</div>


          
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-400">Shipped Orders</p>
      <p className="text-2xl font-bold text-white mt-1">{stats.shipped}</p>
    </div>
    <div className="p-3 bg-purple-900/30 rounded-lg">
      <Truck className="w-6 h-6 text-purple-400" />
    </div>
  </div>
</div>


          {/* <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatPrice(stats.revenue)}
                </p>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div> */}
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
                  placeholder="Search orders by ID, customer name, or email..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="appearance-none bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
              </div>

              <button 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="inline-flex items-center px-4 py-2.5 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-all"
              >
                Clear Filters
              </button>

              <button className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          {loading && orders.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter" 
                  : "No orders available"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                      Order ID
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                      Customer
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                      Date
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                      Amount
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                      Status
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredOrders.map((order) => {
                    const orderTotal = calculateOrderTotal(order);
                    console.log(`Order ${order._id}: total =`, orderTotal, "raw data:", order);
                    
                    return (
                      <React.Fragment key={order._id}>
                        <tr className="hover:bg-gray-800 transition-colors duration-150">
                          <td className="py-4 px-6">
                            <div>
                              <button
                                onClick={() => toggleOrderDetails(order._id)}
                                className="text-blue-400 hover:text-blue-300 font-mono text-sm hover:underline flex items-center"
                              >
                                #{order._id?.slice(-8) || 'N/A'}
                                <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${
                                  expandedOrder === order._id ? 'rotate-90' : ''
                                }`} />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-full flex items-center justify-center mr-3">
                                <User className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium text-white">{order.user?.name || 'Guest'}</p>
                                <p className="text-sm text-gray-400">
                                  <Mail className="w-3 h-3 inline mr-1" />
                                  {order.user?.email || 'No email'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-gray-300 text-sm">
                                {formatDate(order.createdAt || order.orderDate)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="flex items-center justify-center h-8 w-8 bg-green-900/30 rounded-lg mr-2">
                                <IndianRupee className="w-4 h-4 text-green-400" />
                              </div>
                              <div>
                                <p className="font-bold text-white text-lg">
                                  {formatPrice(orderTotal)}
                                </p>
                                <p className="text-xs text-gray-400">Order Total</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <select
                                value={order.status || 'Pending'}
                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                className={`px-3 py-1.5 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${getStatusColor(order.status)} cursor-pointer`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleOrderDetails(order._id)}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-900/30 text-blue-400 hover:bg-blue-800/50 border border-blue-800/50 transition-all"
                              >
                                {expandedOrder === order._id ? (
                                  <>
                                    <EyeOff className="w-4 h-4 mr-1" />
                                    Hide
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </>
                                )}
                              </button>

                              {/* <button
                                onClick={() => deleteOrder(order._id)}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-red-900/30 text-red-400 hover:bg-red-800/50 border border-red-800/50 transition-all"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </button> */}
                            </div>
                          </td>
                        </tr>

                        {expandedOrder === order._id && (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 bg-gray-800">
                              <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-lg font-bold text-white">Order Details - #{order._id?.slice(-8)}</h4>
                                  <button
                                    onClick={() => setExpandedOrder(null)}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                  >
                                    <X className="w-5 h-5 text-gray-400" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Customer Information */}
                                  <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                                    <h5 className="font-semibold text-white mb-4 flex items-center">
                                      <User className="w-4 h-4 mr-2" />
                                      Customer Information
                                    </h5>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-sm text-gray-400">Name</p>
                                        <p className="font-medium text-white">{order.user?.name || 'Guest'}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-400">Email</p>
                                        <p className="font-medium text-white">{order.user?.email || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-400">Phone</p>
                                        <p className="font-medium text-white">{order.user?.phone || order.shippingAddress?.phone || order.shippingAddress?.mobile ||'N/A'}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Shipping Address */}
                                  <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                                    <h5 className="font-semibold text-white mb-4 flex items-center">
                                      <MapPin className="w-4 h-4 mr-2" />
                                      Shipping Address
                                    </h5>
                                    {order.shippingAddress ? (
                                      <div className="space-y-3">
                                        <p className="text-white">{order.shippingAddress.address || order.shippingAddress.street || "N/A"}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-sm text-gray-400">City</p>
                                            <p className="font-medium text-white">{order.shippingAddress.city}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-400">Postal Code</p>
                                            <p className="font-medium text-white">{order.shippingAddress.postalCode || order.shippingAddress.pincode || "N/A"}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-400">State</p>
                                            <p className="font-medium text-white">{order.shippingAddress.state}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-400">Country</p>
                                            <p className="font-medium text-white">{order.shippingAddress.country}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <p className="text-gray-500">No shipping address provided</p>
                                    )}
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                                  <h5 className="font-semibold text-white mb-4">Order Items</h5>
                                  <div className="space-y-3">
                                    {order.orderItems && order.orderItems.length > 0 ? (
                                      order.orderItems.map((item, index) => {
                                        const itemPrice = parseFloat(item.price) || 0;
const itemQuantity =
  parseInt(item.quantity || item.qty) || 1;
                                        const itemTotal = itemPrice * itemQuantity;
                                        
                                        return (
                                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                                            <div className="flex items-center">
                                              <div className="h-10 w-10 bg-gray-700 rounded-lg mr-3 flex items-center justify-center">
                                                <Package className="w-5 h-5 text-gray-400" />
                                              </div>
                                              <div>
                                                <p className="font-medium text-white">{item.name || item.product?.name || 'Product'}</p>
                                                <p className="text-sm text-gray-400">Quantity: {itemQuantity}</p>
                                              </div>
                                            </div>
                                            <div className="text-right">
                                              <p className="font-medium text-white">{formatPrice(itemPrice)} each</p>
                                              <p className="text-sm text-gray-400">Total: {formatPrice(itemTotal)}</p>
                                            </div>
                                          </div>
                                        );
                                      })
                                    ) : (
                                      <p className="text-gray-500">No items in this order</p>
                                    )}
                                  </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                                  <h5 className="font-semibold text-white mb-4">Order Summary</h5>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2">
                                      <span className="text-gray-400">Items Total</span>
                                      <span className="font-medium text-lg text-white">
                                        {formatPrice(order.itemsPrice || orderTotal)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                      <span className="text-gray-400">Shipping</span>
                                      <span className="font-medium text-white">
                                        {formatPrice(order.shippingPrice || 0)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                      <span className="text-gray-400">Tax</span>
                                      <span className="font-medium text-white">
                                        {formatPrice(order.taxPrice || 0)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 pt-4 border-t border-gray-600">
                                      <span className="font-bold text-white text-lg">Total Amount</span>
                                      <div className="text-right">
                                        <p className="font-bold text-white text-xl">
                                          {formatPrice(orderTotal)}
                                        </p>
                                        <p className="text-xs text-gray-400">Including all charges</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Order Status & Payment */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                                    <h5 className="font-semibold text-white mb-4">Order Status</h5>
                                    <div className="flex items-center mb-3">
                                      <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status || 'Pending'}
                                      </span>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm text-gray-400">Order Date</p>
                                      <p className="font-medium text-white">{formatDate(order.createdAt)}</p>
                                    </div>
                                  </div>

                                  <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                                    <h5 className="font-semibold text-white mb-4">Payment Information</h5>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-sm text-gray-400">Payment Method</p>
                                        <p className="font-medium text-white">
                                          {order.paymentMethod || 'Cash on Delivery'}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-400">Payment Status</p>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.isPaid ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                                          {order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                      </div>
                                      {order.paidAt && (
                                        <div>
                                          <p className="text-sm text-gray-400">Paid On</p>
                                          <p className="font-medium text-white">
                                            {formatDate(order.paidAt)}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}