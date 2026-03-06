"use client";

import {
  Users,
  Zap,
  CreditCard,
  Activity,
  TrendingUp,
  Loader2,
  RefreshCw,
  Search
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { AdminDashboardData, AdminMeter } from "@/types/api";

const defaultChartData = [
  { name: "Mon", energy: 0 },
  { name: "Tue", energy: 0 },
  { name: "Wed", energy: 0 },
  { name: "Thu", energy: 0 },
  { name: "Fri", energy: 0 },
  { name: "Sat", energy: 0 },
  { name: "Sun", energy: 0 },
];

export default function DashboardOverview() {
  const [statsData, setStatsData] = useState<AdminDashboardData | null>(null);
  const [meters, setMeters] = useState<AdminMeter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [chartData, setChartData] = useState(defaultChartData);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [stats, allMeters] = await Promise.all([
        api.getAdminDashboard(),
        api.getAllMeters()
      ]);
      setStatsData(stats);
      setMeters(allMeters || []);

      // Mock processing for chart data based on available meter readings if needed
      // For now, we'll keep it simple or use a default trend
    } catch (err: any) {
      console.error('Failed to fetch admin data:', err);
      setError(err.message || 'An error occurred while fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !statsData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6">
        <p className="text-red-400">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  const stats = [
    {
      name: "Total Users",
      value: statsData?.userStats?.totalUsers || 0,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      name: "Active Subscriptions",
      value: statsData?.subscriptionStats?.activeSubscriptions || 0,
      icon: CreditCard,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      name: "Total Revenue",
      value: `₵${statsData?.subscriptionStats?.totalRevenue?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      name: "Active Meters (24h)",
      value: statsData?.systemStats?.activeMeters24h || 0,
      icon: Activity,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const filteredMeters = meters.filter(meter =>
    meter.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.meterCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Administrator Overview</h1>
          <p className="text-zinc-400">
            System-wide statistics and user usage tracking
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-2 ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-zinc-400">{stat.name}</h3>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6">
        {/* User Usage Table */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white">User Usage Overview</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900/50 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-6 py-4 font-medium">User Details</th>
                  <th className="px-6 py-4 font-medium">Meter Code</th>
                  <th className="px-6 py-4 font-medium">Last Energy Reading</th>
                  <th className="px-6 py-4 font-medium">Last Seen</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredMeters.map((meter) => (
                  <tr key={meter.meterCode} className="group hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{meter.user?.fullname || meter.user?.username}</div>
                      <div className="text-xs text-zinc-500">{meter.user?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-blue-400">{meter.meterCode}</code>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {meter.lastReading?.energyKWh ? `${meter.lastReading.energyKWh.toFixed(2)} kWh` : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {meter.lastReading?.timestamp ? new Date(meter.lastReading.timestamp).toLocaleString() : "Never"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${meter.subscription?.status === 'active'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                        {meter.subscription?.status || 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredMeters.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-zinc-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Load Chart (Optional/Placeholder for future) */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">System Energy Trend</h3>
            <span className="text-xs text-zinc-500">Weekly Aggregate</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Area type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorEnergy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
