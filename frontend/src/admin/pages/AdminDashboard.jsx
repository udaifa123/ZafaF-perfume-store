import { useEffect, useState } from "react";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Package,
  Activity,
  BarChart3,
  LineChart,
  PieChart
} from "lucide-react";
import API from "../../api/axios";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get("/admin/stats");
      setStats(response.data);
    } catch (err) {
      setError("Failed to load dashboard statistics");
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num) => {
    if (!num) return "0";
    return new Intl.NumberFormat('en-IN').format(num);
  };

  // Calculate percentage changes (mock data - replace with actual API data)
  const getPercentageChange = (type) => {
    const changes = {
      users: 12.5,
      orders: 8.2,
      revenue: 15.7,
      products: 4.3
    };
    return changes[type] || 0;
  };

  // Sales data for line chart (last 7 days)
  const salesData = [
    { day: 'Mon', sales: 42000, orders: 18 },
    { day: 'Tue', sales: 52000, orders: 22 },
    { day: 'Wed', sales: 61000, orders: 25 },
    { day: 'Thu', sales: 48000, orders: 20 },
    { day: 'Fri', sales: 72000, orders: 28 },
    { day: 'Sat', sales: 85000, orders: 32 },
    { day: 'Sun', sales: 68000, orders: 26 }
  ];

  // Revenue by category for bar chart
  const revenueByCategory = [
    { category: 'Premium', revenue: 125000, count: 45 },
    { category: 'Best Seller', revenue: 98000, count: 62 },
    { category: 'New Arrival', revenue: 72000, count: 38 },
    { category: 'Limited', revenue: 105000, count: 28 },
    { category: 'Gifts', revenue: 56000, count: 42 }
  ];

  // Order status distribution for pie chart
  const orderStatusData = [
    { name: 'Delivered', value: 45, color: '#10B981' },
    { name: 'Processing', value: 25, color: '#3B82F6' },
    { name: 'Shipped', value: 15, color: '#F59E0B' },
    { name: 'Pending', value: 10, color: '#EF4444' },
    { name: 'Cancelled', value: 5, color: '#6B7280' }
  ];

  const statCards = [
    {
      title: "Total Users",
      value: formatNumber(stats.users || 8),
      icon: Users,
      color: "bg-blue-600",
      iconColor: "text-blue-400",
      trend: getPercentageChange('users'),
      description: "Registered customers"
    },
    {
      title: "Total Orders",
      value: formatNumber(stats.orders || 0),
      icon: ShoppingBag,
      color: "bg-green-600",
      iconColor: "text-green-400",
      trend: getPercentageChange('orders'),
      description: "Completed orders"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(stats.revenue || 0),
      icon: DollarSign,
      color: "bg-purple-600",
      iconColor: "text-purple-400",
      trend: getPercentageChange('revenue'),
      description: "Lifetime revenue"
    },
    {
      title: "Products",
      value: formatNumber(stats.products || 20),
      icon: Package,
      color: "bg-amber-600",
      iconColor: "text-amber-400",
      trend: getPercentageChange('products'),
      description: "Active products"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 border border-red-800 rounded-lg p-6 text-center">
        <div className="text-red-300 mb-2">{error}</div>
        <button
          onClick={fetchStats}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome to your admin dashboard</p>
        </div>
        <button
          onClick={fetchStats}
          className="inline-flex items-center px-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {stat.trend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">from last month</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-3">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trend Chart */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <LineChart className="w-5 h-5 text-blue-400 mr-2" />
              <h2 className="text-lg font-semibold">Sales Trend (Last 7 Days)</h2>
            </div>
            <div className="text-sm text-gray-400">
              Daily Revenue & Orders
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="day" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  formatter={(value, name) => [
                    name === 'sales' ? `₹${value.toLocaleString()}` : value,
                    name === 'sales' ? 'Revenue' : 'Orders'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  name="Revenue"
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  name="Orders"
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Category Chart */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-green-400 mr-2" />
              <h2 className="text-lg font-semibold">Revenue by Category</h2>
            </div>
            <div className="text-sm text-gray-400">
              Total Revenue: ₹456,000
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="category" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Products Sold'
                  ]}
                />
                <Legend />
                <Bar 
                  dataKey="revenue" 
                  name="Revenue" 
                  fill="#8B5CF6" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="count" 
                  name="Products Sold" 
                  fill="#F59E0B" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Distribution */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex items-center mb-6">
            <PieChart className="w-5 h-5 text-purple-400 mr-2" />
            <h2 className="text-lg font-semibold">Order Status Distribution</h2>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  formatter={(value) => [`${value} orders`, 'Count']}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {orderStatusData.map((status, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-sm text-gray-300">{status.name}</span>
                <span className="ml-auto text-sm font-medium">{status.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats & Status Card */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center mb-6">
              <Activity className="w-5 h-5 text-blue-400 mr-2" />
              <h2 className="text-lg font-semibold">Activity Summary</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-gray-400">Average Order Value</span>
                <span className="font-semibold">
                  ₹0
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                <span className="text-gray-400">Conversion Rate</span>
                <span className="font-semibold">
                  0%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Sessions</span>
                <span className="font-semibold">
                  0
                </span>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-gradient-to-r from-blue-700 to-purple-800 rounded-xl border border-blue-800 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mb-2">System Status</h2>
                <p className="text-gray-300">All systems are operational</p>
                <div className="flex items-center mt-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-300">Last updated: Just now</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-gray-300">Uptime</div>
              </div>
            </div>
            
            <button className="mt-6 w-full bg-white text-blue-700 font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Data updates in real-time • Last refresh: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}