"use client";

import { useState, useEffect } from "react";
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";

interface AnalyticsChartProps {
  title: string;
  type: "area" | "bar" | "pie";
  data?: any[];
  dataKey?: string;
  categoryKey: string;
  color?: string;
  height?: number;
  period?: 'day' | 'week' | 'month';
  useLiveData?: boolean;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AnalyticsChart({ 
  title, 
  type, 
  data: propData, 
  dataKey = "value", 
  categoryKey, 
  color = "#3b82f6",
  height = 300,
  period = 'week',
  useLiveData = false
}: AnalyticsChartProps) {
  const [data, setData] = useState(propData || []);
  const [loading, setLoading] = useState(useLiveData);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>(period);

  useEffect(() => {
    if (!useLiveData) {
      setData(propData || []);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const analytics: any = await api.getAnalytics(selectedPeriod);
        if (analytics.data && Array.isArray(analytics.data)) {
          const formattedData = analytics.data.map((item: any, index: number) => ({
            name: new Date(item.timestamp).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            }),
            energy: Number(item.energyKWh) || 0,
            cost: Number(item.costGHS) || 0,
            value: type === 'area' ? Number(item.energyKWh) : Number(item.costGHS), // Dynamic based on chart type
          }));
          setData(formattedData);
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [useLiveData, selectedPeriod, propData, type]);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {useLiveData && (
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedPeriod('day')}
              className={`text-xs font-medium transition-colors ${
                selectedPeriod === 'day' ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              Day
            </button>
            <button 
              onClick={() => setSelectedPeriod('week')}
              className={`text-xs font-medium transition-colors ${
                selectedPeriod === 'week' ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setSelectedPeriod('month')}
              className={`text-xs font-medium transition-colors ${
                selectedPeriod === 'month' ? 'text-blue-400' : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              Month
            </button>
          </div>
        )}
      </div>
      <div style={{ height: `${height}px`, width: "100%" }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {type === "area" ? (
               <AreaChart data={data}>
                  <defs>
                    <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey={categoryKey} stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#e4e4e7' }}
                  />
                  <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#color-${title})`} />
                </AreaChart>
            ) : type === "bar" ? (
               <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey={categoryKey} stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#e4e4e7' }}
                    cursor={{fill: "#27272a", opacity: 0.4}}
                  />
                  <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
                </BarChart>
            ) : (
              <PieChart>
                  <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey={dataKey}
                      nameKey={categoryKey}
                  >
                      {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                      ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#e4e4e7' }}
                  />
                   <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
