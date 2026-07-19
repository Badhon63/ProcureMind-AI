"use client";
import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration Complete! Please Login.");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 mx-4">
        <h2 className="text-2xl font-bold text-gray-950 text-center mb-2">
          Create Account
        </h2>
        <p className="text-xs text-secondary text-center mb-6">
          Join as an Enterprise Procurement Manager
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Company Domain Email
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Create Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-2.5 rounded-lg text-sm hover:bg-opacity-90 transition"
          >
            Register Account
          </button>
        </form>

        <p className="text-xs text-center text-secondary mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
