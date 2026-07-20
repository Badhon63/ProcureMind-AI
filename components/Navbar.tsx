"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LogOut,
  UserCheck,
  Compass,
  PlusCircle,
  LayoutDashboard,
  BrainCircuit,
} from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="font-extrabold text-xl text-gray-950 tracking-tight flex items-center gap-2"
      >
        <span className="p-1.5 bg-slate-950 text-white rounded-lg text-xs">
          AI
        </span>{" "}
        ProcureMind
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link
          href="/explore"
          className="hover:text-primary transition flex items-center gap-1.5"
        >
          <Compass className="w-4 h-4 text-gray-400" /> Explore RFPs
        </Link>
        <Link
          href="/items/add"
          className="hover:text-primary transition flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4 text-gray-400" /> Add Request
        </Link>
        <Link
          href="/items/manage"
          className="hover:text-primary transition flex items-center gap-1.5"
        >
          <LayoutDashboard className="w-4 h-4 text-gray-400" /> Manage
        </Link>
        <Link
          href="/insights"
          className="hover:text-primary transition flex items-center gap-1.5"
        >
          <BrainCircuit className="w-4 h-4 text-gray-400" /> AI Insights
        </Link>
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-gray-200">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-red-600 hover:text-red-700 transition flex items-center gap-1 border border-red-100 bg-red-50/50 px-3 py-1.5 rounded-lg"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-900 hover:text-primary transition"
          >
            →] Login
          </Link>
        )}
      </div>
    </nav>
  );
}
