"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Zap,
  Menu,
  MessageSquare
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
  { name: "Payments", href: "/admin/dashboard/payments", icon: CreditCard },
  { name: "Support", href: "/admin/dashboard/support", icon: MessageSquare },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 left-4 z-50 rounded-md bg-zinc-900 p-2 text-white lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-40 h-screen w-64 transform bg-zinc-950 border-r border-zinc-800 transition-transform duration-200ease-in-out lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex h-16 items-center border-b border-zinc-800 px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-white">
            <Zap className="h-6 w-6 text-blue-500" />
            <span>Admin<span className="text-blue-500">Panel</span></span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col justify-between p-4 space-y-2 h-[calc(100vh-64px)]">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-600/10 text-blue-500"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-zinc-800 pt-4">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/10 hover:text-red-300">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
