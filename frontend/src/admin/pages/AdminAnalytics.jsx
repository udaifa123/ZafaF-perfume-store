import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  Activity,
  Users,
  ShoppingCart,
  IndianRupee,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const [revenueChart, setRevenueChart] = useState(Array(12).fill(0));
  const [orderChart, setOrderChart] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await API.get("/admin/analytics");

        setStats({
          totalUsers: data.totalUsers,
          totalOrders: data.totalOrders,
          totalRevenue: data.totalRevenue,
          pendingOrders: data.pendingOrders,
        });

        /* MONTHLY REVENUE */
        const months = Array(12).fill(0);
        data.monthlyRevenue.forEach((m) => {
          months[m._id - 1] = m.total;
        });
        setRevenueChart(months);

        setOrderChart(data.orderStatus);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading analytics...
      </div>
    );
  }

  const barData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ],
    datasets: [
      {
        label: "Revenue ₹",
        data: revenueChart,
        backgroundColor: "#22c55e",
      },
    ],
  };

  const pieData = {
    labels: orderChart.map((o) => o._id),
    datasets: [
      {
        data: orderChart.map((o) => o.count),
        backgroundColor: ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Activity /> Admin Analytics
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Users" value={stats.totalUsers} trend="up" />
        <StatCard label="Orders" value={stats.totalOrders} trend="up" />
        {/* <StatCard
          label="Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          trend="up"
        /> */}
        <StatCard label="Pending" value={stats.pendingOrders} trend="down" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Monthly Revenue</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Order Status</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">{label}</span>
        {trend === "up" ? (
          <ArrowUpRight className="text-green-400" />
        ) : (
          <ArrowDownRight className="text-red-400" />
        )}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
