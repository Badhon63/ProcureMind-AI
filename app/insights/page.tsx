"use client";
import { useState } from "react";
import axios from "axios";
import { Cpu, Loader2, Sparkles } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";

interface AIAnalysisResult {
  rawMaterialsCost: number;
  logisticsCost: number;
  savingsOpportunity: number;
  riskAnalysisSummary: string;
}

export default function AIInsightsPage() {
  const [inputData, setInputData] = useState(
    "Raw Materials: 50000, Logistics: 25000, Discrepancies: 8000",
  );
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post<AIAnalysisResult>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/analyze`,
        { supplyData: inputData },
      );
      setAnalysis(res.data);
    } catch (err) {
      console.error("AI Analysis Error:", err);
      toast.error("AI Analysis failed. Check backend console.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = analysis
    ? [
        { name: "Raw Materials", Amount: analysis.rawMaterialsCost },
        { name: "Logistics", Amount: analysis.logisticsCost },
        { name: "Savings Identified", Amount: analysis.savingsOpportunity },
      ]
    : [];

  return (
    <div className="bg-gray-50 min-h-screen pt-10 sm:pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Cpu className="text-accent hidden sm:block" /> Agentic AI Budget
          Intelligence
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Input Corporate Logistics or Budget Data
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-primary font-mono"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 bg-black text-white font-medium px-6 py-2.5 rounded-lg hover:bg-opacity-90 transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {loading ? "AI Agent Analyzing..." : "Run Autonomous Analysis"}
          </button>
        </div>

        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">
                Cost Structure Visualization
              </h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Bar
                      dataKey="Amount"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">
                  AI Agent Report
                </h3>
                <div className="bg-green-50/50 border border-green-100 p-4 rounded-lg text-sm text-gray-800 leading-relaxed mb-4">
                  {analysis.riskAnalysisSummary}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm">
                <span className="text-secondary">
                  Projected Savings Opportunity:
                </span>
                <span className="font-bold text-accent text-lg">
                  ${analysis.savingsOpportunity?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
