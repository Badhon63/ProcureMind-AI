"use client";
"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-10 text-center max-w-md w-full">
        <div className="flex justify-center mb-5">
          <div className="bg-red-50 p-4 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          We couldn&apos;t load this page. Please try again or return to the
          homepage.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-lg bg-slate-950 text-white text-sm font-medium hover:bg-slate-800 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
