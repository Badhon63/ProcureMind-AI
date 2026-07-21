"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { LogIn, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
      } else {
        router.push("/items/manage");
        toast.success("Login Successful!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleDemoLogin = async () => {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: "demo@demo.com",
        password: "12345678",
      });

      if (error) {
        toast.error(error.message || "Demo login failed!");
      } else {
        router.push("/items/manage");
        toast.success("Logged in as Demo User!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white py-8 px-5 rounded-xl shadow-sm border border-gray-100 mx-4">
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
              placeholder="example@mail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary text-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-950 text-white font-medium py-3 rounded-lg text-sm hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full mt-3 bg-stone-100 border border-stone-200 text-gray-800 font-medium py-1.5 text-sm rounded-lg hover:bg-stone-200 transition disabled:opacity-50 cursor-pointer"
        >
          Try Demo Account
        </button>
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition shadow cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <g fill="none" fillRule="evenodd" clipRule="evenodd">
              <path
                fill="#f44336"
                d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86"
                opacity={0.987}
              ></path>
              <path
                fill="#ffc107"
                d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92"
                opacity={0.997}
              ></path>
              <path
                fill="#448aff"
                d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49"
                opacity={0.999}
              ></path>
              <path
                fill="#43a047"
                d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z"
                opacity={0.993}
              ></path>
            </g>
          </svg>
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-xs text-center text-secondary mt-6">
          Don&apos;t have an account?{" "}
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
