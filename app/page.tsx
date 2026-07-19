"use client";
import Link from "next/link";
import { ArrowRight, Cpu, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen pt-32 flex flex-col justify-between">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="bg-emerald-50 text-accent text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Next-Gen Supply Chain Platform
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-950 mt-6 tracking-tight leading-none">
          Autonomous Procurement <br />
          <span className="text-primary">Powered by Agentic AI</span>
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Streamline enterprise sourcing, automate RFP creation, and unlock
          cost-saving insights using autonomous data intelligence agents.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/explore"
            className="bg-primary text-white font-medium px-8 py-3.5 rounded-xl hover:bg-opacity-90 transition flex items-center gap-2 text-sm shadow-sm"
          >
            Explore Requests <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/insights"
            className="bg-white border border-gray-200 text-gray-900 font-medium px-8 py-3.5 rounded-xl hover:bg-gray-50 transition text-sm"
          >
            Try AI Insights
          </Link>
        </div>
      </div>

      {/* Feature Badges */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-gray-200/60 mt-20 w-full">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-emerald-50 rounded-xl text-accent">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              Real-time Sourcing
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Publish RFP contracts and manage dynamic supplier feedback
              instantly.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-emerald-50 rounded-xl text-accent">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              Agentic Cost Intelligence
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Deep analysis of logistics and supply budgets with automatic graph
              generation.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-emerald-50 rounded-xl text-accent">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Secure Database</h3>
            <p className="text-xs text-gray-500 mt-1">
              Full control over operations with absolute validation and reliable
              deletion protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
