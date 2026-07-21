export default function AboutPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-10 sm:pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About ProcureMind AI
        </h1>

        <p className="text-gray-600 leading-7 mb-8">
          ProcureMind AI is an AI powered procurement and sourcing platform that
          helps organizations create procurement requests faster and more
          efficiently. Businesses can publish sourcing requirements while
          suppliers explore opportunities through a simple and modern interface.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-stone-200">
            <h2 className="font-semibold text-lg mb-2">Our Mission</h2>
            <p className="text-sm text-gray-600">
              Simplify procurement with intelligent tools that reduce manual
              effort and improve sourcing decisions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-stone-200">
            <h2 className="font-semibold text-lg mb-2">Our Vision</h2>
            <p className="text-sm text-gray-600">
              Enable organizations of every size to manage procurement through
              modern digital workflows.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-stone-200">
            <h2 className="font-semibold text-lg mb-2">AI Features</h2>
            <p className="text-sm text-gray-600">
              Generate procurement specifications and analyze procurement data
              using powerful large language models.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
