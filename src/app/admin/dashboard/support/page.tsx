"use client";

import { useState } from "react";
import { Search, Send, MessageSquare, MoreVertical, Paperclip, Smile } from "lucide-react";

// Mock Data
const CONVERSATIONS = [
  { id: 1, name: "Kwame Mensah", lastMessage: "My meter stopped reading...", time: "2m", unread: 2, status: "online" },
  { id: 2, name: "Ama Osei", lastMessage: "Thanks for the help!", time: "1h", unread: 0, status: "offline" },
  { id: 3, name: "John Doe", lastMessage: "How do I top up?", time: "3h", unread: 0, status: "online" },
  { id: 4, name: "Support Bot", lastMessage: "Automated alert: Grid low voltage", time: "1d", unread: 0, status: "offline" },
];

const MESSAGES = [
  { id: 1, sender: "Kwame Mensah", text: "Hello, I have an issue with my meter.", time: "10:30 AM", isMe: false },
  { id: 2, sender: "You", text: "Hi Kwame, what seems to be the problem?", time: "10:32 AM", isMe: true },
  { id: 3, sender: "Kwame Mensah", text: "My meter stopped reading voltage about an hour ago. The display is blank.", time: "10:33 AM", isMe: false },
];

export default function SupportPage() {
  const [selectedChat, setSelectedChat] = useState(CONVERSATIONS[0]);
  const [messages, setMessages] = useState(MESSAGES);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 overflow-hidden">
      {/* Sidebar List */}
      <div className="flex w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm lg:w-80">
        <div className="border-b border-zinc-800 p-4">
          <h2 className="mb-4 text-lg font-bold text-white">Messages</h2>
          <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2">
            <Search className="h-4 w-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {CONVERSATIONS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${
                selectedChat.id === chat.id 
                  ? "bg-blue-600/10" 
                  : "hover:bg-zinc-800"
              }`}
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-white font-medium">
                  {chat.name.charAt(0)}
                </div>
                {chat.status === "online" && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-zinc-900"></span>
                )}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center mb-0.5">
                  <p className={`text-sm font-medium ${selectedChat.id === chat.id ? "text-blue-500" : "text-white"}`}>
                    {chat.name}
                  </p>
                  <span className="text-xs text-zinc-500">{chat.time}</span>
                </div>
                <p className="text-xs text-zinc-400 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {chat.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex flex-1 flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden hidden lg:flex">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-4 bg-zinc-900/80">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-white font-medium">
                {selectedChat.name.charAt(0)}
             </div>
             <div>
                <h3 className="text-sm font-bold text-white">{selectedChat.name}</h3>
                <p className="text-xs text-green-500 flex items-center gap-1">
                   <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Online
                </p>
             </div>
          </div>
          <button className="text-zinc-400 hover:text-white">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.isMe 
                  ? "bg-blue-600/20 text-blue-100 border border-blue-600/30 rounded-br-none" 
                  : "bg-zinc-800 text-zinc-300 rounded-bl-none"
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.isMe ? "text-blue-300" : "text-zinc-500"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-zinc-800 p-4 bg-zinc-900/80">
          <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
            <button type="button" className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Paperclip className="h-5 w-5" />
            </button>
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full rounded-full bg-zinc-800 border border-zinc-700 pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                    <Smile className="h-5 w-5" />
                </button>
            </div>
            <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className="rounded-full bg-blue-600 p-3 text-white transition-colors hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
