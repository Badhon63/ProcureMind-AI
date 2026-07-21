import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function CTA() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-slate-950 rounded-2xl text-white p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Modernize Procurement?
          </h2>

          <p className="text-gray-300 mb-8">
            Create procurement requests faster with AI powered specification
            generation.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href={session?.user ? "/items/manage" : "/register"}
              className="bg-white text-black px-6 py-3 rounded-lg font-medium"
            >
              {session?.user ? "Manage Procurement" : "Get Started"}
            </Link>

            <Link
              href="/explore"
              className="border border-white px-6 py-3 rounded-lg font-medium"
            >
              Explore Requests
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
