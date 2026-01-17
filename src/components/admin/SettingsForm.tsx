"use client";

import { useState } from "react";
import { User, Lock, Bell, Save } from "lucide-react";

export default function SettingsForm() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
      <div className="border-b border-zinc-800">
        <nav className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <User className="h-4 w-4" />
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "password"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Lock className="h-4 w-4" />
            Change Password
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "notifications"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Bell className="h-4 w-4" />
            Notifications
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-2xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">First Name</label>
                <input
                  type="text"
                  defaultValue="Admin"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Last Name</label>
                <input
                  type="text"
                  defaultValue="User"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Email Address</label>
              <input
                type="email"
                defaultValue="admin@example.com"
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Bio</label>
              <textarea
                rows={4}
                defaultValue="Administrator for Power Track Dashboard."
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === "password" && (
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Current Password</label>
              <input
                type="password"
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">New Password</label>
              <input
                type="password"
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Confirm New Password</label>
              <input
                type="password"
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                <Save className="h-4 w-4" />
                Update Password
              </button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-950 border border-zinc-800">
              <div>
                <h3 className="text-sm font-medium text-white">Email Notifications</h3>
                <p className="text-xs text-zinc-400">Receive emails about new support tickets</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-950 border border-zinc-800">
              <div>
                <h3 className="text-sm font-medium text-white">Payment Alerts</h3>
                <p className="text-xs text-zinc-400">Get notified when high value payments occur</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
             <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-950 border border-zinc-800">
              <div>
                <h3 className="text-sm font-medium text-white">New User Signups</h3>
                <p className="text-xs text-zinc-400">Receive weekly digest of new users</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                <Save className="h-4 w-4" />
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
