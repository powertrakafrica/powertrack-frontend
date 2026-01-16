import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-black/80 dark:supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2 font-bold text-xl tracking-tighter text-black dark:text-white" href="#">
          <span className="text-blue-600 dark:text-blue-500">Smart</span>Energy
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black dark:text-white">
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#features">
            Features
          </Link>
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#how-it-works">
            How it Works
          </Link>
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#pricing">
            Pricing
          </Link>
          <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#support">
            Support
          </Link>
        </nav>
        <div className="flex items-center gap-4">
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
