import { useEffect, useState } from "react";
import API from "../api/axios";
import { ShoppingBag, IndianRupee, Calendar } from "lucide-react";

export default function Revenue() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">My Orders & Spending</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <ShoppingBag className="text-blue-500 mb-2" />
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <IndianRupee className="text-green-500 mb-2" />
          <h2 className="text-gray-500">Total Spent</h2>
          <p className="text-2xl font-bold">₹{totalSpent}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <Calendar className="text-purple-500 mb-2" />
          <h2 className="text-gray-500">Last Order</h2>
          <p className="text-lg font-semibold">
            {orders.length
              ? new Date(orders[0].createdAt).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-3">{order._id.slice(-6)}</td>
                <td className="p-3 font-semibold">₹{order.total}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
