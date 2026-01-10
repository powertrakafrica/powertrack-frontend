import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white" href="#">
          <span className="text-blue-500">Smart</span>Energy
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link className="hover:text-white transition-colors" href="#features">
            Features
          </Link>
          <Link className="hover:text-white transition-colors" href="#how-it-works">
            How it Works
          </Link>
          <Link className="hover:text-white transition-colors" href="#pricing">
            Pricing
          </Link>
          <Link className="hover:text-white transition-colors" href="#support">
            Support
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            href="#"
          >
            Log in
          </Link>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
            href="#"
          >
            Download App
          </Link>
        </div>
      </div>
    </header>
  );
}
