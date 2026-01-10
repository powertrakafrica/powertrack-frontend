import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-24 md:px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white sm:text-4xl">
          Simple Pricing
        </h2>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          Affordable monthly subscription to keep your services running.
        </p>
      </div>
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm relative">
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            MOST POPULAR
        </div>
        <div className="p-8 text-center">
          <h3 className="text-lg font-semibold text-zinc-500 dark:text-zinc-400">
            Monthly Subscription
          </h3>
          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold tracking-tight text-black dark:text-white">
              ₵20
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">/mo</span>
          </div>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
            Includes full access to the mobile app and dashboard features.
          </p>
          <ul className="mt-8 space-y-4 text-left">
            {[
              "Real-time monitoring 24/7",
              "Unlimited history storage",
              "Smart goal setting & SMS alerts",
              "Remote switch control",
              "Priority Support",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            href="#"
          >
            Start Your Free Trial
          </Link>
          <p className="mt-4 text-xs text-zinc-400">
            No credit card required for hardware request.
          </p>
        </div>
      </div>
    </section>
  );
}
