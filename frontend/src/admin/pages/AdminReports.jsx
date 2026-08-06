import { useEffect, useState } from "react";
import API from "../../api/axios";
import { BarChart3, Download, TrendingUp, DollarSign, ShoppingCart, Calendar, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await API.get("/admin/reports");
        setReports(data.reports);
      } catch (err) {
        console.error("Report fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const downloadReport = (report) => {
    const fileData = JSON.stringify(report, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.type}-report.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ggray-900 via-black to-gray-900">
      <div className="p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Business Reports</h1>
              <p className="text-gray-400 text-sm mt-1">Real-time sales, orders & revenue analytics</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reports.map((report, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <button
                  onClick={() => downloadReport(report)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {report.type} Report
              </h3>

              <div className="space-y-3 mt-4">
                {report.totalOrders !== undefined && (
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Total Orders</span>
                    </div>
                    <span className="text-white font-bold text-lg">{report.totalOrders}</span>
                  </div>
                )}

                {report.totalRevenue !== undefined && (
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-400 text-sm">Total Revenue</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-lg">₹{report.totalRevenue?.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Updated just now
                </span>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reports Table */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Detailed Reports
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/40 border-b border-gray-700">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Report Type
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Metrics
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {reports.map((report, i) => (
                  <tr key={i} className="hover:bg-black/40 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{report.type} Report</p>
                          <p className="text-xs text-gray-500">Generated automatically</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {report.totalOrders !== undefined && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <ShoppingCart className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-medium text-blue-400">
                              {report.totalOrders} Orders
                            </span>
                          </div>
                        )}
                        {report.totalRevenue !== undefined && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-400">
                              ₹{report.totalRevenue?.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg w-fit">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-emerald-400">Active</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => downloadReport(report)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 duration-200"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reports.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 font-medium">No reports available</p>
              <p className="text-gray-600 text-sm mt-1">Reports will appear here once generated</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {reports.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{reports.length}</p>
                  <p className="text-xs text-gray-400">Total Reports</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {reports.reduce((sum, r) => sum + (r.totalOrders || 0), 0)}
                  </p>
                  <p className="text-xs text-gray-400">Total Orders</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    ₹{reports.reduce((sum, r) => sum + (r.totalRevenue || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}