import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center mb-5 sm:text-left sm:mb-0">
          <p className="text-2xl font-bold text-gray-900">ProcureMind AI</p>
          <p className="text-xs text-gray-500 mt-0.5">
            AI powered procurement and sourcing platform for modern businesses.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>

          <Link href="/explore" className="hover:text-gray-900 transition">
            Explore
          </Link>

          <Link href="/about" className="hover:text-gray-900 transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-gray-900 transition">
            Contact
          </Link>

          <Link href="/insights" className="hover:text-gray-900 transition">
            AI Insights
          </Link>

          <Link href="/register" className="hover:text-gray-900 transition">
            Register
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} ProcureMind AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
