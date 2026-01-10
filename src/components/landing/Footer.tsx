import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-black">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 md:px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2 font-bold text-lg text-black dark:text-white">
          <span className="text-blue-600">Smart</span>Energy
        </div>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 md:text-left">
          © {new Date().getFullYear()} Smart Energy Monitor. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="#" className="hover:text-black dark:hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-black dark:hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
