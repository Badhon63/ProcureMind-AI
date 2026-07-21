export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      company: "Nova Manufacturing",
      text: "ProcureMind AI reduced our procurement preparation time dramatically.",
    },
    {
      name: "David Lee",
      company: "TechSupply Ltd.",
      text: "The AI generated specifications saved our procurement team hours.",
    },
    {
      name: "Emily Brown",
      company: "Global Logistics",
      text: "Simple, fast and easy to use for sourcing projects.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl text-emerald-900 font-bold text-center mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-emerald-50 rounded-xl p-6 border border-emerald-100"
            >
              <p className="text-gray-600 mb-4">&quot;{item.text}&quot;</p>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
