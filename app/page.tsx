"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react"; // আপনি চাইলে এখানে ফন্ট অসামের আইকনও দিতে পারেন

export default function AddItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    fullDesc: "",
    budget: "",
    location: "",
    category: "Raw Materials",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // আমাদের ব্যাকএন্ড এপিআই-তে ডেটা পাঠানো হচ্ছে
      await axios.post("http://localhost:5000/api/items", {
        ...formData,
        budget: Number(formData.budget),
      });
      alert("Request Posted Successfully!");
      router.push("/explore"); // সফল হলে এক্সপ্লোর পেজে নিয়ে যাবে
    } catch (err) {
      alert("Failed to post request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 mx-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <PlusCircle className="text-accent" /> Create Sourcing Request (RFP)
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Project Title
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-primary"
              placeholder="e.g., Bulk Organic Cotton Procurement"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Category
              </label>
              <select
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-primary"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Raw Materials">Raw Materials</option>
                <option value="Logistics">Logistics</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Estimated Budget ($)
              </label>
              <input
                type="number"
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-primary"
                placeholder="5000"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Target Location
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-primary"
                placeholder="e.g., Dhaka, Bangladesh"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Image URL (Optional)
              </label>
              <input
                type="url"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-primary"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Short Description
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-primary"
              placeholder="Brief summary for list view cards..."
              value={formData.shortDesc}
              onChange={(e) =>
                setFormData({ ...formData, shortDesc: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Full Specifications / Requirements
            </label>
            <textarea
              rows={4}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
              placeholder="Provide detailed material descriptions, required certifications, delivery dates..."
              value={formData.fullDesc}
              onChange={(e) =>
                setFormData({ ...formData, fullDesc: e.target.value })
              }
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Submitting Request..." : "Publish Sourcing Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
