import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-gray-900">ProcureMind AI</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Autonomous Procurement & Agentic Sourcing Platform
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-500">
          <Link href="/explore" className="hover:text-gray-900 transition">
            Explore
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
