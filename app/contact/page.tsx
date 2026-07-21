import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>

        <p className="text-gray-600 mb-10">
          We&apos;d love to hear from you. Reach out using the information
          below.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">support@procuremind.ai</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-gray-600">+880 1234 567890</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-primary" />
              <div>
                <p className="font-medium">Office</p>
                <p className="text-sm text-gray-600">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-stone-300 outline-black/40 rounded-lg px-4 py-3 "
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-stone-300 outline-black/40 rounded-lg px-4 py-3 "
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border border-stone-300 outline-black/40 rounded-lg px-4 py-3  "
              />

              <button
                type="button"
                className="bg-slate-950 text-white px-6 py-3 rounded-lg hover:bg-black/80 transition cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
