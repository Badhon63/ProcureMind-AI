"use client";
import React from "react";
import Link from "next/link";

export default function LoginPage() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Demo Login Successful!");
    window.location.href = "/items/manage"; // লগইন হলে ড্যাশবোর্ডে নিয়ে যাবে
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 mx-4">
        <h2 className="text-2xl font-bold text-gray-950 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-xs text-secondary text-center mb-6">
          Enter your details to access ProcureMind AI
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Corporate Email
            </label>
            <input
              type="email"
              required
              defaultValue="manager@company.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              defaultValue="••••••••"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm hover:bg-opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-secondary mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-accent font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
