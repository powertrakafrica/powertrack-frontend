"use client";

import { 
  Users, 
  Zap, 
  CreditCard, 
  AlertTriangle, 
  TrendingUp,
  ArrowUpRight,
  User
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

const data = [
  { name: "Mon", energy: 4000, cost: 2400 },
  { name: "Tue", energy: 3000, cost: 1398 },
  { name: "Wed", energy: 2000, cost: 9800 },
  { name: "Thu", energy: 2780, cost: 3908 },
  { name: "Fri", energy: 1890, cost: 4800 },
  { name: "Sat", energy: 2390, cost: 3800 },
  { name: "Sun", energy: 3490, cost: 4300 },
];

const stats = [
  {
    name: "Total Users",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Active Meters",
    value: "1,180",
    change: "+8%",
    icon: Zap,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    name: "Revenue (Jan)",
    value: "₵45,230",
    change: "+24%",
    icon: CreditCard,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    name: "Active Alerts",
    value: "12",
    change: "-2%",
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-zinc-400">Welcome back, here's what's happening today.</p>
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
            <h3 className="text-lg font-bold text-white">System Energy Consumption</h3>
            <div className="flex gap-2">
              <button className="text-xs font-medium text-blue-400 hover:text-blue-300">Weekly</button>
              <button className="text-xs font-medium text-zinc-500 hover:text-zinc-400">Monthly</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
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
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
             <h3 className="text-lg font-bold text-white">Recent Activity</h3>
             <button className="flex items-center text-xs text-blue-400 hover:text-blue-300">
                View All <ArrowUpRight className="ml-1 h-3 w-3" />
             </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                    <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                        <User className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white">New user registered</p>
                        <p className="text-xs text-zinc-500">2 minutes ago • Accra</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
