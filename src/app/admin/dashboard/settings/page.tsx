"use client";

import SettingsForm from "@/components/admin/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-zinc-400">Manage your account and preferences.</p>
        </div>
      </div>

      <SettingsForm />
    </div>
  );
}
