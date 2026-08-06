import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  Package, Truck, CheckCircle, XCircle, Clock,
  MapPin, CreditCard, Calendar, ChevronRight, Filter,
  Trash2, Eye, EyeOff, ArrowRight, ShoppingBag,
  RefreshCw, Tag, Download, MessageCircle, RotateCcw,
  ShoppingCart, Check, Circle, X, Undo2, Box,
  Info   // ✅ ADD THIS
} from "lucide-react";

import { successAlert, errorAlert } from "../utils/alert";

const IMAGE_URL = "http://localhost:5000/uploads";

export default function UserOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showCanceledOrders, setShowCanceledOrders] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItemsToReturn, setSelectedItemsToReturn] = useState({});
  const [returnReason, setReturnReason] = useState("");
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [currentOrderForReturn, setCurrentOrderForReturn] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders");
      console.log("Orders Data:", res.data); // Debug log
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // CANCEL INDIVIDUAL ORDER
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await API.put(`/orders/${orderId}/cancel`);
      successAlert("Order Canceled", "Your order has been canceled successfully");
      fetchOrders();
    } catch (err) {
      errorAlert("Error", "Failed to cancel order", err);
    }
  };

  // CLEAR ALL CANCELED ORDERS
  const clearCanceledOrders = async () => {
    if (!window.confirm("Clear all canceled orders from your history?")) return;
    try {
      await API.delete("/orders/clear-canceled");
      successAlert("Success", "Canceled orders cleared from history");
      fetchOrders();
    } catch (err) {
      errorAlert("Error", "Failed to clear canceled orders", err);
    }
  };

  // Check if order can be returned
  const canReturnOrder = (order) => {
    // Allow return for Delivered orders within 30 days
    if (order.status?.toLowerCase() !== "delivered") return false;
    
    const deliveredDate = new Date(order.updatedAt || order.createdAt);
    const currentDate = new Date();
    const daysDifference = (currentDate - deliveredDate) / (1000 * 60 * 60 * 24);
    
    return daysDifference <= 30; // 30-day return policy
  };

  // Check if order can be canceled
 const canCancelOrder = (order) => {
  // ✅ Status check
  const cancelableStatuses = ["processing", "pending"];

  if (!cancelableStatuses.includes(order.status?.toLowerCase())) {
    return false;
  }

  // ⏰ Time limit check (30 minutes)
  const orderTime = new Date(order.createdAt);
  const now = new Date();
  const diffMinutes = (now - orderTime) / (1000 * 60);

  return diffMinutes <= 30; // 🔥 ONLY 30 mins
};


  // INITIATE RETURN
  const initiateReturn = (order) => {
    setCurrentOrderForReturn(order);
    setSelectedItemsToReturn({});
    setReturnReason("");
    setShowReturnModal(true);
  };

  // SUBMIT RETURN REQUEST
  const submitReturnRequest = async () => {
    if (!currentOrderForReturn) return;
    
    const selectedItems = Object.keys(selectedItemsToReturn).filter(itemId => selectedItemsToReturn[itemId]);
    
    if (selectedItems.length === 0) {
      errorAlert("Error", "Please select at least one item to return");
      return;
    }

    if (!returnReason.trim()) {
      errorAlert("Error", "Please provide a reason for return");
      return;
    }

    try {
      const returnData = {
        orderId: currentOrderForReturn._id,
        items: selectedItems,
        reason: returnReason,
        returnDate: new Date().toISOString()
      };

      await API.post("/orders/return", returnData);
      successAlert("Return Request Submitted", "Your return request has been submitted successfully");
      
      // Reset state
      setShowReturnModal(false);
      setCurrentOrderForReturn(null);
      setSelectedItemsToReturn({});
      setReturnReason("");
      
      // Refresh orders
      fetchOrders();
    } catch (err) {
      errorAlert("Error", "Failed to submit return request", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'skipped': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'returned': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'return requested': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'canceled': return <XCircle className="w-4 h-4" />;
      case 'skipped': return <X className="w-4 h-4" />;
      case 'returned': return <Undo2 className="w-4 h-4" />;
      case 'return requested': return <Box className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTrackingSteps = (order) => {
    const orderDate = new Date(order.createdAt);
    const status = order.status || 'Processing';
    const isCanceled = status === 'Canceled' || status === 'canceled';
    const isDelivered = status === 'Delivered' || status === 'delivered';
    const isShipped = status === 'Shipped' || status === 'shipped' || isDelivered;
    const isProcessing = status === 'Processing' || status === 'processing' || isShipped || isDelivered;
    const isReturned = status === 'Returned' || status === 'returned' || status === 'Return Requested' || status === 'return requested';

    // Calculate realistic dates for each step
    const placedDate = orderDate;
    const processingDate = new Date(orderDate);
    processingDate.setHours(processingDate.getHours() + 2); // 2 hours after order
    
    const shippedDate = new Date(orderDate);
    shippedDate.setDate(shippedDate.getDate() + 1); // 1 day after order
    
    const deliveredDate = new Date(orderDate);
    deliveredDate.setDate(deliveredDate.getDate() + 3); // 3 days after order

    const steps = [
      { 
        label: "Order Placed", 
        description: "Order confirmed successfully",
        status: "completed",
        date: placedDate,
        icon: <ShoppingCart className="w-5 h-5" />
      },
      { 
        label: "Processing", 
        description: "Preparing your order for shipment",
        status: isProcessing ? "completed" : isCanceled ? "canceled" : "pending",
        date: isProcessing ? processingDate : null,
        icon: <Package className="w-5 h-5" />
      },
      { 
        label: "Shipped", 
        description: "Order dispatched for delivery",
        status: isShipped ? "completed" : isCanceled ? "canceled" : "pending",
        date: isShipped ? shippedDate : null,
        icon: <Truck className="w-5 h-5" />
      },
      { 
        label: "Delivered", 
        description: "Order delivered successfully",
        status: isDelivered ? "completed" : isCanceled ? "canceled" : "pending",
        date: isDelivered ? deliveredDate : null,
        icon: <Check className="w-5 h-5" />
      }
    ];

    if (isCanceled) {
      steps.push({
        label: "Canceled",
        description: "Order has been canceled",
        status: "canceled",
        date: new Date(order.updatedAt || orderDate),
        icon: <XCircle className="w-5 h-5" />
      });
    }

    if (isReturned) {
      steps.push({
        label: status === 'Return Requested' || status === 'return requested' ? "Return Requested" : "Returned",
        description: status === 'Return Requested' || status === 'return requested' 
          ? "Return request submitted" 
          : "Order has been returned",
        status: "completed",
        date: new Date(order.updatedAt || orderDate),
        icon: <Undo2 className="w-5 h-5" />
      });
    }

    return steps;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric',
        month: 'short', 
        year: 'numeric' 
      });
    } catch (error) {
      return "",error;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', { 
        day: 'numeric',
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit'
      });
    } catch (error) {
      return "",error;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (!showCanceledOrders && order.status.toLowerCase() === "canceled") return false;
    if (filterStatus !== "all" && order.status !== filterStatus) {
      // Handle case-insensitive comparison
      if (filterStatus.toLowerCase() === "all") return true;
      if (order.status.toLowerCase() !== filterStatus.toLowerCase()) return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900">My Orders</h1>
              <p className="text-gray-500 mt-2">
                Track, return, or buy things again
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setShowCanceledOrders(!showCanceledOrders)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  showCanceledOrders 
                    ? "bg-gray-900 text-white border-gray-900" 
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                {showCanceledOrders ? <EyeOff size={16} /> : <Eye size={16} />}
                {showCanceledOrders ? "Hide Canceled" : "Show Canceled"}
              </button>
              
              {/* Clear Canceled Button - Removes canceled orders from history */}
              <button 
                onClick={clearCanceledOrders}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-700 text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Clear Canceled
              </button>
              
              <button 
                onClick={fetchOrders}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {["all", "Processing", "Skipped", "Shipped", "Delivered", "Returned", "Return Requested", "Canceled"].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filterStatus === status
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status === "all" ? "All Orders" : status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">When you place orders, they'll appear here</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Start Shopping
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => {
              const trackingSteps = getTrackingSteps(order);
              const canCancel = canCancelOrder(order);
              const canReturn = canReturnOrder(order);
              
              return (
                <div 
                  key={order._id} 
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="text-sm font-medium">{order.status}</span>
                          </div>
                          <span className="text-sm text-gray-500">Order ID: {order._id?.slice(-8).toUpperCase() || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>Placed on {formatDate(order.createdAt)}</span>
                          </div>
                          {order.total && (
                            <div className="flex items-center gap-1">
                              <Tag size={14} />
                              <span className="font-medium">₹{order.total.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                        >
                          {expandedOrder === order._id ? "Hide Details" : "View Details"}
                          <ChevronRight className={`w-4 h-4 transition-transform ${expandedOrder === order._id ? "rotate-90" : ""}`} />
                        </button>
                        
                        {/* Cancel Order Button - Shows for Processing and Skipped orders */}
                        {canCancel && (
                          <button
                            onClick={() => cancelOrder(order._id)}
                            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                          >
                            Cancel Order
                          </button>

                         

                        )}
                        {!canCancel && order.status?.toLowerCase() === "processing" && (
  <p className="text-xs text-gray-500 mt-2">
    Cancellation available only within 30 minutes of placing the order
  </p>
)}

                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items?.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden">
                              <img
                                src={
                                  item.product?.image
                                    ? `${IMAGE_URL}/${item.product.image}`
                                    : "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"
                                }
                                alt={item.product?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop";
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{item.product?.name || "Product"}</h4>
                            <p className="text-sm text-gray-500 mb-2">{item.product?.category || "Category"}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                <span className="text-gray-600">Qty: {item.quantity}</span>
                                <span className="mx-2">•</span>
                                <span className="font-medium">₹{(item.quantity * (item.product?.price || 0)).toLocaleString()}</span>
                              </div>
                              {item.product?._id && (
                                <button
                                  onClick={() => navigate(`/products/${item.product._id}`)}
                                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                                >
                                  {/* View Product */}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {order.items?.length > 3 && (
                        <div className="flex items-center justify-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="text-center">
                            <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">+{order.items.length - 3} more items</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === order._id && (
                    <div className="border-t border-gray-100">
                      {/* Tracking Timeline */}
                      <div className="p-6 border-b border-gray-100">
                        <h3 className="font-medium text-gray-900 mb-6 flex items-center gap-2">
                          <Truck className="w-5 h-5" />
                          Order Tracking
                        </h3>
                        <div className="relative">
                          {/* Vertical Line */}
                          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                          
                          <div className="space-y-8">
                            {trackingSteps.map((step, index) => (
                              <div key={index} className="relative flex gap-4">
                                {/* Step Icon */}
                                <div className={`z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                                  step.status === "completed" ? "bg-green-100 border-2 border-green-300" :
                                  step.status === "canceled" ? "bg-red-100 border-2 border-red-300" :
                                  "bg-gray-100 border-2 border-gray-300"
                                }`}>
                                  <div className={`${
                                    step.status === "completed" ? "text-green-600" :
                                    step.status === "canceled" ? "text-red-600" :
                                    "text-gray-400"
                                  }`}>
                                    {step.icon}
                                  </div>
                                </div>
                                
                                {/* Step Details */}
                                <div className="flex-1 pb-8">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className={`font-medium ${
                                        step.status === "completed" ? "text-green-700" :
                                        step.status === "canceled" ? "text-red-700" :
                                        "text-gray-700"
                                      }`}>
                                        {step.label}
                                      </h4>
                                      {step.status === "completed" && (
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                      )}
                                      {step.status === "canceled" && (
                                        <XCircle className="w-4 h-4 text-red-600" />
                                      )}
                                    </div>
                                    {step.date && (
                                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {step.label === "Order Placed" 
                                          ? formatDate(step.date)
                                          : formatDateTime(step.date)
                                        }
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Address & Payment Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        {/* Shipping Address */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Shipping Address
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            {order.address ? (
                              <>
                                <p className="font-medium text-gray-900">{order.address.fullName}</p>
                                <p className="text-gray-600">{order.address.street}</p>
                                <p className="text-gray-600">{order.address.city}, {order.address.state} {order.address.pincode}</p>
                                <p className="text-gray-600 mt-2">
                                  <span className="font-medium">Phone:</span> {order.address.phone}
                                </p>
                                {order.address.landmark && (
                                  <p className="text-gray-600">
                                    <span className="font-medium">Landmark:</span> {order.address.landmark}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-gray-500">No address provided</p>
                            )}
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Payment Details
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Payment Method</span>
<span className="font-medium">
  {order.paymentMethod === "PAYPAL" ? "PayPal" : "Cash on Delivery"}
</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Items Total</span>
                                <span>₹{order.total ? (order.total + (order.discount || 0) - (order.shipping || 0) - (order.tax || 0)).toLocaleString() : "0"}</span>
                              </div>
                              {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                  <span>Discount</span>
                                  <span>-₹{order.discount?.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span>{order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span>₹{order.tax?.toFixed(0) || "0"}</span>
                              </div>
                              <div className="border-t pt-3 flex justify-between font-medium">
                                <span>Total Amount</span>
                                <span className="text-lg">₹{order.total?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="px-6 pb-6">
                        <div className="flex flex-wrap gap-3">
                          {canReturn && (
                            <button 
                              onClick={() => initiateReturn(order)}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                              <Undo2 size={16} />
                              Return Items
                            </button>
                          )}
                          {canCancel && (
                            <button
                              onClick={() => cancelOrder(order._id)}
                              className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                            >
                              <X size={16} />
                              Cancel Order
                            </button>
                          )}
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            <Download size={16} />
                            Download Invoice
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            <MessageCircle size={16} />
                            Contact Support
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl font-light text-gray-900">{orders.length}</div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl font-light text-green-600">
                {orders.filter(o => o.status.toLowerCase() === "delivered").length}
              </div>
              <div className="text-sm text-gray-500">Delivered</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl font-light text-blue-600">
                {orders.filter(o => o.status.toLowerCase() === "processing").length}
              </div>
              <div className="text-sm text-gray-500">Processing</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl font-light text-orange-600">
                {orders.filter(o => o.status.toLowerCase() === "skipped").length}
              </div>
              <div className="text-sm text-gray-500">Skipped</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl font-light text-purple-600">
                {orders.filter(o => o.status.toLowerCase() === "returned" || o.status.toLowerCase() === "return requested").length}
              </div>
              <div className="text-sm text-gray-500">Returned</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl font-light text-red-600">
                {orders.filter(o => o.status.toLowerCase() === "canceled").length}
              </div>
              <div className="text-sm text-gray-500">Canceled</div>
            </div>
          </div>
        )}
      </div>

      {/* Return Modal */}
      {showReturnModal && currentOrderForReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-gray-900">Return Items</h3>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-600 mt-2">Select items you want to return from order #{currentOrderForReturn._id?.slice(-8).toUpperCase()}</p>
            </div>

            <div className="p-6">
              {/* Items Selection */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-900">Select Items to Return:</h4>
            {currentOrderForReturn.items?.map((item, idx) => {
  const productId =
    typeof item.product === "object"
      ? String(item.product._id)
      : String(item.product); // 🔥 FORCE STRING

  return (
    <div
      key={idx}   // ✅ USE idx (IMPORTANT)
      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={Boolean(selectedItemsToReturn[productId])}
          onChange={(e) => {
            setSelectedItemsToReturn((prev) => ({
              ...prev,
              [productId]: e.target.checked,
            }));
          }}
          className="w-5 h-5 text-blue-600 rounded"
        />

        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden">
          <img
            src={
              item.product?.image
                ? `${IMAGE_URL}/${item.product.image}`
                : "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"
            }
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="font-medium text-gray-900">
            {item.product?.name || "Product"}
          </p>
          <p className="text-sm text-gray-500">
            Qty: {item.quantity} • ₹
            {(item.quantity * (item.product?.price || 0)).toLocaleString()}
          </p>
        </div>
      </div>

      <span className="font-medium">
        ₹{(item.quantity * (item.product?.price || 0)).toLocaleString()}
      </span>
    </div>
  );
})}


              </div>

              {/* Return Reason */}
              <div className="mb-6">
                <label htmlFor="returnReason" className="block font-medium text-gray-900 mb-2">
                  Reason for Return *
                </label>
                <textarea
                  id="returnReason"
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  placeholder="Please describe why you want to return these items..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows="4"
                  required
                />
              </div>

              {/* Return Policy Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800">
                      <strong>Return Policy:</strong> Items can be returned within 30 days of delivery. 
                      Refunds will be processed within 5-7 business days after we receive the returned items.
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReturnRequest}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit Return Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}