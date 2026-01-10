import { 
  LayoutDashboard, 
  History, 
  Target, 
  Settings, 
  Smartphone, 
  Zap 
} from "lucide-react";

const features = [
  {
    name: "Dashboard",
    description: "Get a bird's eye view of your energy status. Monitoring voltage, current, and total energy in real-time.",
    icon: LayoutDashboard,
  },
  {
    name: "History",
    description: "Track your usage patterns over time. See daily, weekly, and monthly reports to save costs.",
    icon: History,
  },
  {
    name: "Goals & Limits",
    description: "Set daily or monthly consumption goals. Get notified when you are about to exceed them.",
    icon: Target,
  },
  {
    name: "Remote Control",
    description: "Turn your meter on or off directly from the app. Perfect for when you're away.",
    icon: Smartphone,
  },
  {
    name: "Hardware Integration",
    description: "Seamlessly connects with our proprietary smart meter hardware for accurate readings.",
    icon: Zap,
  },
  {
    name: "Profile & Settings",
    description: "Manage your profile, location, and meter details. Customise the app to your needs.",
    icon: Settings,
  },
];

export default function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-24 md:px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white sm:text-4xl md:text-5xl">
          Complete Energy Management
        </h2>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400 md:text-xl">
          Everything you need to monitor and control your power consumption.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
              {feature.name}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Hardware Spotlight Section */}
      <div className="mt-24 rounded-3xl bg-zinc-900 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center p-8 md:p-12">
            <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                    <Zap className="mr-2 h-4 w-4" />
                    Proprietary Hardware
                </div>
                <h3 className="text-3xl font-bold text-white md:text-4xl">
                    Smart Meter Included
                </h3>
                <p className="text-zinc-400 text-lg">
                    Our custom-built smart meter connects directly to your home's power supply. 
                    It supports both Wifi and GSM (SIM800L) for reliable data transmission, 
                    even during internet outages.
                </p>
                <div className="space-y-4">
                    {[
                        "Real-time Voltage & Current Sampling",
                        "Offline Data Storage",
                        "Overload Protection",
                        "Easy Wall-Mount Installation"
                    ].map((item) => (
                        <div key={item} className="flex items-center text-zinc-300">
                            <div className="mr-3 h-2 w-2 rounded-full bg-blue-500" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative flex items-center justify-center min-h-[300px] bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                {/* Placeholder for Smart Meter Image */}
                <div className="flex flex-col items-center justify-center text-zinc-500">
                    <div className="mb-4 h-32 w-24 rounded-lg border-2 border-dashed border-zinc-600 bg-zinc-800 flex items-center justify-center">
                        <Zap className="h-8 w-8 opacity-50" />
                    </div>
                    <p className="text-sm">Smart Meter Hardare Image</p>
                </div>
                {/* Decoration */}
                <div className="absolute -right-12 -top-12 h-64 w-64 bg-blue-600/20 blur-[80px]" />
            </div>
        </div>
      </div>
    </section>
  );
}
