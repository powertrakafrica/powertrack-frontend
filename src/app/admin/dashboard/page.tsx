"use client";

import { 
  Users, 
  Zap, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp,
  ArrowUpRight,
  User,
  Loader2,
  RefreshCw
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
import { useDashboard } from "@/hooks/useDashboard";
import { useEffect, useState } from "react";
import api from "@/lib/api";

// Mock data for chart - will be replaced with analytics data
const defaultChartData = [
  { name: "Mon", energy: 0, cost: 0 },
  { name: "Tue", energy: 0, cost: 0 },
  { name: "Wed", energy: 0, cost: 0 },
  { name: "Thu", energy: 0, cost: 0 },
  { name: "Fri", energy: 0, cost: 0 },
  { name: "Sat", energy: 0, cost: 0 },
  { name: "Sun", energy: 0, cost: 0 },
];

export default function DashboardOverview() {
  const { data, loading, error, refetch } = useDashboard(true, 10000); // Auto-refresh every 10s
  const [chartData, setChartData] = useState(defaultChartData);
  const [loadingChart, setLoadingChart] = useState(true);

  // Fetch analytics data for chart
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analytics: any = await api.getAnalytics('week');
        if (analytics.data && Array.isArray(analytics.data)) {
          const formattedData = analytics.data.map((item: any) => ({
            name: new Date(item.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
            energy: item.energyKWh,
            cost: item.costGHS,
          }));
          setChartData(formattedData);
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading && !data) {
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
          onClick={refetch}
          className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  const stats = [
    {
      name: "Today's Energy",
      value: data?.stats?.todayEnergy ? `${data.stats.todayEnergy.toFixed(2)} kWh` : "0 kWh",
      change: "+12%",
      icon: Zap,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      name: "Today's Cost",
      value: data?.stats?.todayCost ? `₵${data.stats.todayCost.toFixed(2)}` : "₵0",
      change: "+8%",
      icon: CreditCard,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      name: "Current Voltage",
      value: data?.live?.voltage ? `${data.live.voltage.toFixed(1)}V` : "0V",
      change: data?.live?.status === 'online' ? 'Online' : 'Offline',
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      name: "Current Power",
      value: data?.live?.power ? `${data.live.power.toFixed(2)}W` : "0W",
      change: data?.live?.current ? `${data.live.current.toFixed(2)}A` : "0A",
      icon: AlertTriangle,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-zinc-400">
            Live data from your smart meter • Last updated: {data?.live?.timestamp ? new Date(data.live.timestamp).toLocaleTimeString() : 'N/A'}
          </p>
        </div>
        <button
          onClick={refetch}
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
              <div className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-zinc-400">{stat.name}</h3>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Energy Consumption (Week)</h3>
            <div className="flex gap-2">
              <button className="text-xs font-medium text-blue-400 hover:text-blue-300">Weekly</button>
              <button className="text-xs font-medium text-zinc-500 hover:text-zinc-400">Monthly</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            {loadingChart ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kWh`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#e4e4e7' }}
                  />
                  <Area type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorEnergy)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Meter Info */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
             <h3 className="text-lg font-bold text-white">Meter Information</h3>
             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
               data?.live?.status === 'online' 
                 ? 'bg-green-500/10 text-green-400' 
                 : 'bg-red-500/10 text-red-400'
             }`}>
               {data?.live?.status || 'Unknown'}
             </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <span className="text-sm text-zinc-400">Meter Code</span>
              <span className="text-sm font-medium text-white">{data?.live?.meterCode || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <span className="text-sm text-zinc-400">Voltage</span>
              <span className="text-sm font-medium text-white">{data?.live?.voltage?.toFixed(2) || '0'} V</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <span className="text-sm text-zinc-400">Current</span>
              <span className="text-sm font-medium text-white">{data?.live?.current?.toFixed(2) || '0'} A</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <span className="text-sm text-zinc-400">Power</span>
              <span className="text-sm font-medium text-white">{data?.live?.power?.toFixed(2) || '0'} W</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <span className="text-sm text-zinc-400">Total Energy</span>
              <span className="text-sm font-medium text-white">{data?.live?.energy?.toFixed(2) || '0'} kWh</span>
            </div>
            <div className="flex justify-between items-center p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <span className="text-sm text-zinc-400">Total Cost</span>
              <span className="text-sm font-medium text-white">₵{data?.live?.cost?.toFixed(2) || '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
