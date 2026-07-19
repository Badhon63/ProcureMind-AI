"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PlusCircle, Loader2 } from "lucide-react";

export default function AddItemPage() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    category: "Raw Materials",
    budget: "",
    location: "",
    shortDesc: "",
    fullDesc: "",
  });

  const mutation = useMutation({
    mutationFn: async (newData: typeof formData) => {
      const res = await axios.post("http://localhost:5000/api/items", newData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      alert("Request Posted Successfully!");
      window.location.href = "/items/manage";
    },
    onError: () => {
      alert("Failed to post request. Is Backend running?");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-5 mx-4"
      >
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
          <PlusCircle className="text-primary" /> Create Sourcing Request (RFP)
        </h2>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
            Project Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g., Bulk Organic Cotton Procurement"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Category
            </label>
            <select
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Raw Materials</option>
              <option>Logistics</option>
              <option>Services</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
              Estimated Budget ($)
            </label>
            <input
              type="number"
              required
              placeholder="5000"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
            Target Location
          </label>
          <input
            type="text"
            required
            placeholder="e.g., Dhaka, Bangladesh"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
            Short Description
          </label>
          <input
            type="text"
            required
            placeholder="Brief summary for list view..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            onChange={(e) =>
              setFormData({ ...formData, shortDesc: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
            Full Specifications
          </label>
          <textarea
            rows={4}
            required
            placeholder="Provide detailed requirements..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            onChange={(e) =>
              setFormData({ ...formData, fullDesc: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary text-white font-medium py-3 rounded-lg text-sm hover:bg-opacity-90 transition flex items-center justify-center gap-2"
        >
          {mutation.isPending ? "Publishing..." : "Publish Sourcing Request"}
        </button>
      </form>
    </div>
  );
}
