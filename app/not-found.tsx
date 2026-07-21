"use client";
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-5">
          <div className="bg-gray-100 p-4 rounded-full">
            <FileQuestion className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-slate-950 text-white text-sm font-medium hover:bg-slate-800 transition"
          >
            Go Home
          </Link>

          <Link
            href="/explore"
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Explore RFPs
          </Link>
        </div>
      </div>
    </div>
  );
}
