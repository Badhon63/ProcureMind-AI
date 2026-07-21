import { Cpu, ShieldCheck, Zap } from "lucide-react";

const FeatureBadges = () => {
  return (
    <div>
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
};

export default FeatureBadges;
