import { FilePlus, Sparkles, Send, Search } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FilePlus className="w-8 h-8 text-primary" />,
      title: "Create Request",
      desc: "Create a procurement request within minutes.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Generate Specification",
      desc: "AI creates a detailed procurement specification.",
    },
    {
      icon: <Send className="w-8 h-8 text-primary" />,
      title: "Publish",
      desc: "Publish your procurement request instantly.",
    },
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Receive Responses",
      desc: "Suppliers discover your procurement opportunities.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-xl p-6 text-center shadow-inner bg-gray-50 border border-gray-200"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
