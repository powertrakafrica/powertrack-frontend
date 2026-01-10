import { Mail, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

export default function Support() {
  return (
    <section id="support" className="relative overflow-hidden bg-black py-24 text-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
      <div className="absolute bottom-0 right-0 translate-y-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-purple-600/20 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Need Assistance?
          </h2>
          <p className="mt-4 text-zinc-400 md:text-lg max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with installation, app setup, or any technical issues.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Card 1: Phone */}
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:bg-zinc-900">
            <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Call Support</h3>
            <p className="text-zinc-400 mb-4 text-sm">Speak directly with an agent</p>
            <div className="space-y-2">
              <p className="font-medium text-white hover:text-blue-400 transition-colors cursor-pointer">+233 55 123 4567</p>
              <p className="font-medium text-white hover:text-blue-400 transition-colors cursor-pointer">+233 24 987 6543</p>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center transition-all hover:-translate-y-1 hover:border-purple-500/50 hover:bg-zinc-900">
             <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 text-purple-500 transition-colors group-hover:bg-purple-500 group-hover:text-white">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Email Us</h3>
            <p className="text-zinc-400 mb-4 text-sm">For general inquiries & quotes</p>
            <Link 
              href="mailto:support@smartenergy.gh" 
              className="inline-block font-medium text-white hover:text-purple-400 transition-colors"
            >
              support@smartenergy.gh
            </Link>
          </div>

          {/* Card 3: Live Chat */}
          <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center transition-all hover:-translate-y-1 hover:border-green-500/50 hover:bg-zinc-900">
             <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 transition-colors group-hover:bg-green-500 group-hover:text-white">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Live Chat</h3>
            <p className="text-zinc-400 mb-4 text-sm">Instant help within the app</p>
            <div className="space-y-1 text-sm text-white">
              <p>Available Mon-Fri</p>
              <p className="text-zinc-500">8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
