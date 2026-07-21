import { Minus } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "What is ProcureMind AI?",
      a: "An AI powered procurement and sourcing platform.",
    },
    {
      q: "Can I generate procurement specifications?",
      a: "Yes. AI helps generate detailed procurement specifications.",
    },
    {
      q: "Is registration required?",
      a: "Yes. You need an account to create procurement requests.",
    },
    {
      q: "Does it support Google Login?",
      a: "Yes. You can sign in using your Google account.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-stone-300 p-5">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <span className="-mt-2 text-stone-500">
                  <Minus />
                </span>
              </div>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
