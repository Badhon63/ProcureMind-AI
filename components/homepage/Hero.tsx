import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 text-center">
      <span className="bg-emerald-50 text-accent text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
        Next-Gen Supply Chain Platform
      </span>
      <h1 className="text-5xl md:text-6xl font-black text-gray-950 mt-6 tracking-tight leading-none">
        Autonomous Procurement <br />
        <span className="text-primary">Powered by Agentic AI</span>
      </h1>
      <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
        Streamline enterprise sourcing, automate RFP creation, and unlock
        cost-saving insights using autonomous data intelligence agents.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/explore"
          className="bg-slate-950 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-black/80 transition flex items-center gap-2 text-sm shadow-sm"
        >
          Explore Requests <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/insights"
          className="bg-white border border-gray-200 text-slate-900 font-medium px-8 py-3.5 rounded-xl hover:bg-gray-50 transition text-sm shadow-sm"
        >
          Try AI Insights
        </Link>
      </div>
    </div>
  );
};

export default Hero;
