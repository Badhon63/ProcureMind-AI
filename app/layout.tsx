"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { Cpu, LayoutDashboard, Compass, PlusCircle, LogIn } from "lucide-react";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gray-50 text-gray-800"
        suppressHydrationWarning
      >
        <QueryClientProvider client={queryClient}>
          {/* 🌐 গ্লোবাল হেডার / ন্যাভবার */}
          <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              {/* লোগো */}
              <Link
                href="/"
                className="text-xl font-bold text-primary flex items-center gap-2"
              >
                <Cpu className="w-6 h-6 text-accent" />
                <span>ProcureMind AI</span>
              </Link>

              {/* মেনু লিংকসমূহ */}
              <div className="hidden md:flex items-center gap-6 font-medium text-sm text-secondary">
                <Link
                  href="/explore"
                  className="flex items-center gap-1.5 hover:text-primary transition"
                >
                  <Compass className="w-4 h-4" /> Explore RFPs
                </Link>
                <Link
                  href="/items/add"
                  className="flex items-center gap-1.5 hover:text-primary transition"
                >
                  <PlusCircle className="w-4 h-4" /> Add Request
                </Link>
                <Link
                  href="/items/manage"
                  className="flex items-center gap-1.5 hover:text-primary transition"
                >
                  <LayoutDashboard className="w-4 h-4" /> Manage
                </Link>
                <Link
                  href="/insights"
                  className="flex items-center gap-1.5 hover:text-primary transition"
                >
                  <Cpu className="w-4 h-4" /> AI Insights
                </Link>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-secondary hover:text-primary transition flex items-center gap-1"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Register
                </Link>
              </div>
            </div>
          </nav>

          {/* পেজের মূল কনটেন্ট */}
          <main className="min-h-screen">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
