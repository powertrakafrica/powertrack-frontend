"use client";

import { useState } from "react";
import { Plus, Search, MoreVertical, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import UserModal from "@/components/admin/UserModal";
import AnalyticsChart from "@/components/admin/AnalyticsCharts";

interface User {
  id: string;
  name: string;
  email: string;
  meterId: string;
  location: string;
  status: "active" | "suspended" | "pending";
  lastActive: string;
  phone: string; 
}

// Mock Data
const MOCK_USERS: User[] = [
  { id: "1", name: "Kwame Mensah", email: "kwame@example.com", phone: "0241234567", meterId: "M-2023-001", location: "East Legon, Accra", status: "active", lastActive: "2 mins ago" },
  { id: "2", name: "Ama Osei", email: "ama@example.com", phone: "0559876543", meterId: "M-2023-002", location: "Adum, Kumasi", status: "suspended", lastActive: "3 days ago" },
  { id: "3", name: "John Doe", email: "john@example.com", phone: "0205556666", meterId: "M-2023-003", location: "Tema Comm 4", status: "active", lastActive: "1 hour ago" },
  { id: "4", name: "Abena Koomson", email: "abena@example.com", phone: "0278889999", meterId: "M-2023-004", location: "Spintex Road", status: "pending", lastActive: "Never" },
];

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
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.meterId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(undefined);
    setIsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "suspended": return "bg-red-500/10 text-red-500 border-red-500/20";
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
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
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
            placeholder="Search users..." 
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Add more filters here if needed */}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-900 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">Name / Email</th>
                <th className="px-6 py-4 font-medium">Meter ID</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Active</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-zinc-800/50 text-white">
                  <td className="px-6 py-4">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-zinc-500 text-xs">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-300">
                    {user.meterId}
                  </td>
                   <td className="px-6 py-4 text-zinc-400">
                    {user.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => handleEdit(user)}
                        className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                        No users found matching "{searchTerm}"
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        user={selectedUser}
      />
    </div>
  );
}
