import { Download, Router, Wifi } from "lucide-react";

const steps = [
  {
    title: "Request a Meter",
    description: "Download the app and request a smart meter installation for your home or office.",
    icon: Download,
  },
  {
    title: "Installation",
    description: "Our team will install the SIM800L GSM or Wifi enabled smart meter at your location.",
    icon: Router,
  },
  {
    title: "Connect & Monitor",
    description: "Connect the app to your meter via Wifi or GSM and start monitoring instantly.",
    icon: Wifi,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-zinc-50 py-24 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white sm:text-4xl">
            Get Started in 3 Steps
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            Simple setup process to get you up and running.
          </p>
        </div>
        <div className="relative grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                {step.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden border-t-2 border-dashed border-zinc-200 dark:border-zinc-700 md:absolute md:left-1/2 md:top-8 md:block md:w-1/3 md:-translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
