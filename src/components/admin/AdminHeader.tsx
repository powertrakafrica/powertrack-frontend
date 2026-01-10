import { Bell, Search, User } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-zinc-800 bg-zinc-950/80 px-6 backdrop-blur-sm lg:pl-72">
        <div className="flex flex-1 items-center justify-between">
            <div className="flex w-full max-w-sm items-center gap-2 rounded-md bg-zinc-900/50 px-3 py-1.5 border border-zinc-800 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                <Search className="h-4 w-4 text-zinc-500" />
                <input 
                    type="text" 
                    placeholder="Search users, meters..." 
                    className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
            </div>
            
            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-zinc-500">Super Admin</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
