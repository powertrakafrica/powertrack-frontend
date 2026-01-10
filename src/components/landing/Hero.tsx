import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-black px-4 py-24 md:px-6 lg:py-32">
        {/* Background Gradients & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left text-white space-y-8">
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-md shadow-lg shadow-blue-900/10 transition-transform hover:scale-105">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
            Now available in Ghana
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-7xl">
            Take Control of Your <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                Energy Usage
            </span>
            </h1>
            
            <p className="max-w-[600px] text-lg text-zinc-400 md:text-xl leading-relaxed">
            Real-time monitoring of voltage, current, and energy costs in <span className="text-white font-semibold">Ghana Cedis</span>. 
            The all-in-one solution combining powerful hardware, a mobile app, and an admin dashboard.
            </p>

            <div className="flex flex-col gap-4 w-full sm:w-auto sm:flex-row">
            <Link
                className="group relative inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                href="#"
            >
                Download on Play Store
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>
            <Link
                className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/50 px-8 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-800 hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300"
                href="#"
            >
                Request Meter
            </Link>
            </div>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[420px] perspective-1000">
            <div className="relative z-10 overflow-hidden rounded-[3rem] border-8 border-zinc-900 bg-black shadow-2xl transition-transform duration-500 hover:rotate-y-6 hover:rotate-x-6 hover:scale-105">
                 <img 
                    src="/images/app-mockup.png" 
                    alt="App Mockup" 
                    className="h-auto w-full object-cover"
                />
            </div>
            {/* Glow behind phone */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-500 to-purple-500 opacity-40 blur-3xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}
