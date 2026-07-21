export default function Statistics() {
  const stats = [
    { value: "50K+", label: "Procurement Requests" },
    { value: "2K+", label: "Companies" },
    { value: "15K+", label: "Suppliers" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        Trusted by Modern Businesses
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-stone-100 p-8 text-center shadow-sm"
          >
            <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
            <p className="mt-2 text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
