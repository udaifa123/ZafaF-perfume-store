import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users, RefreshCw } from "lucide-react";
import API from "../../api/axios";

export default function Revenue() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRevenue = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/revenue");
      setData(res.data);
    } catch (err) {
      console.error("Revenue fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  const formatCurrency = (amount = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  if (loading) {
    return (
      <div className="p-6 text-lg text-gray-300 bg-black min-h-screen">
        Loading revenue...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-red-400 bg-black min-h-screen">
        No data available
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-900 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Revenue Dashboard</h1>
          <p className="text-gray-400 mt-1">Overview of your business performance</p>
        </div>
        <button
          onClick={fetchRevenue}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 border border-gray-700 hover:border-gray-600"
        >
          <RefreshCw size={16} className="text-gray-300" />
          Refresh
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          icon={<DollarSign className="text-emerald-400" />}
          gradient="from-gray-900 to-gray-800"
        />
        <StatCard
          title="Total Orders"
          value={data.totalOrders}
          icon={<ShoppingBag className="text-blue-400" />}
          gradient="from-gray-900 to-gray-800"
        />
        <StatCard
          title="Total Customers"
          value={data.totalCustomers}
          icon={<Users className="text-purple-400" />}
          gradient="from-gray-900 to-gray-800"
        />
      </div>

      {/* RECENT ORDERS */}
      <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="p-5 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
          <p className="text-gray-400 text-sm mt-1">Latest customer transactions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="p-4 text-left text-gray-300 font-medium">Order ID</th>
                <th className="p-4 text-left text-gray-300 font-medium">Customer</th>
                <th className="p-4 text-left text-gray-300 font-medium">Amount</th>
                <th className="p-4 text-left text-gray-300 font-medium">Status</th>
                <th className="p-4 text-left text-gray-300 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders?.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}

              {data.recentOrders?.map((order, index) => (
                <tr 
                  key={order.orderId} 
                  className={`border-t border-gray-800 hover:bg-gray-800/30 transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-900'
                  }`}
                >
                  <td className="p-4 text-gray-200 font-mono">{order.orderId}</td>
                  <td className="p-4 text-gray-300">{order.user}</td>
                  <td className="p-4 text-emerald-400 font-semibold">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      order.status === 'completed' 
                        ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50'
                        : order.status === 'pending'
                        ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50'
                        : order.status === 'processing'
                        ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
                        : 'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* SMALL REUSABLE CARD */
function StatCard({ title, value, icon, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700">
          {icon}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}