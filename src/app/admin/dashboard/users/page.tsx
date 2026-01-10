"use client";

import { useState, useEffect } from "react";
import { Plus, Search, MoreVertical, Loader2, RefreshCw } from "lucide-react";
import UserModal from "@/components/admin/UserModal";
import AnalyticsChart from "@/components/admin/AnalyticsCharts";
import api, { ApiError } from "@/lib/api";
import { AdminMeter } from "@/types/api";

// Mock data for charts (not connected to API yet)
const USER_GROWTH_DATA = [
  { month: "Jan", users: 50 },
  { month: "Feb", users: 80 },
  { month: "Mar", users: 120 },
  { month: "Apr", users: 190 },
  { month: "May", users: 250 },
  { month: "Jun", users: 310 },
];

const USER_STATUS_DATA = [
  { name: "Active", value: 850 },
  { name: "Pending", value: 120 },
  { name: "Suspended", value: 45 },
];

export default function UsersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [meters, setMeters] = useState<AdminMeter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: any = await api.getAllMeters();
      setMeters(data || []);
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Failed to fetch meters data';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeters();
  }, []);

  const filteredMeters = meters.filter(meter => 
    meter.meterCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (meter: AdminMeter) => {
    setSelectedUser(meter);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(undefined);
    setIsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "suspended": 
      case "expired": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default: return "bg-zinc-500/10 text-zinc-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-zinc-400">Manage access and meter assignments.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchMeters}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <AnalyticsChart 
                title="User Growth" 
                type="area" 
                data={USER_GROWTH_DATA} 
                categoryKey="month" 
                dataKey="users"
                color="#3b82f6"
            />
        </div>
        <div>
            <AnalyticsChart 
                title="User Status Distribution" 
                type="pie" 
                data={USER_STATUS_DATA} 
                categoryKey="name" 
                dataKey="value"
            />
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 border border-zinc-700">
          <Search className="h-4 w-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search by meter code, username, or email..." 
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchMeters}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="bg-zinc-900 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Meter Code</th>
                  <th className="px-6 py-4 font-medium">User / Email</th>
                  <th className="px-6 py-4 font-medium">Subscription</th>
                  <th className="px-6 py-4 font-medium">Last Reading</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filteredMeters.map((meter) => (
                  <tr key={meter.meterCode} className="group hover:bg-zinc-800/50 text-white">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-blue-400">{meter.meterCode}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{meter.user?.username || 'N/A'}</div>
                      <div className="text-zinc-500 text-xs">{meter.user?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(meter.subscription?.status)}`}>
                        {meter.subscription?.status || 'unknown'}
                      </span>
                      {meter.subscription?.expiryDate && (
                        <div className="text-xs text-zinc-500 mt-1">
                          Expires: {new Date(meter.subscription.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {meter.lastReading ? (
                        <div>
                          <div className="text-xs">{meter.lastReading.energyKWh.toFixed(2)} kWh</div>
                          <div className="text-xs text-zinc-500">
                            {new Date(meter.lastReading.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-zinc-500">No data</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                          onClick={() => handleEdit(meter)}
                          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMeters.length === 0 && !loading && (
                  <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                          {searchTerm ? `No meters found matching "${searchTerm}"` : 'No meters found'}
                      </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        user={selectedUser}
      />
    </div>
  );
}
