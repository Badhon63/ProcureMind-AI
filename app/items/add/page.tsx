"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PlusCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Wand2 } from "lucide-react";

const initialFormState = {
  title: "",
  category: "Raw Materials",
  budget: "",
  location: "",
  shortDesc: "",
  fullDesc: "",
  imageUrl: "",
};

export default function AddItemPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const [formData, setFormData] = useState(initialFormState);
  const [genLength, setGenLength] = useState<"short" | "medium" | "long">(
    "medium",
  );

  const mutation = useMutation({
    mutationFn: async (newData: typeof formData) => {
      if (!session?.user?.id) {
        throw new Error("Not authenticated");
      }
      const payload = {
        ...newData,
        budget: Number(newData.budget),
        userId: session.user.id,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Request Posted Successfully!");
      setFormData(initialFormState);
      router.push("/items/manage");
    },
    onError: (err) => {
      if (err instanceof Error && err.message === "Not authenticated") {
        toast.error("Please log in to post a request.");
      } else {
        toast.error("Failed to post request. Please try again.");
      }
    },
  });

  const generateMutation = useMutation({
    mutationFn: async () => {
      if (!formData.title || !formData.shortDesc) {
        throw new Error("Fill in Title and Short Description first");
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ai/generate-description`,
        {
          title: formData.title,
          shortDesc: formData.shortDesc,
          length: genLength,
        },
      );
      return res.data.fullDesc;
    },
    onSuccess: (fullDesc: string) => {
      setFormData((prev) => ({ ...prev, fullDesc }));
      toast.success("Description generated!");
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to generate description");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-sm text-secondary font-medium">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-3">
        <p className="text-sm text-secondary">
          You need to be logged in to post a sourcing request.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-black text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-black/80 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

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
            value={formData.title}
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
              value={formData.category}
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
              Image URL
            </label>

            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imageUrl: e.target.value,
                })
              }
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
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
              value={formData.budget}
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
            value={formData.location}
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
            value={formData.shortDesc}
            onChange={(e) =>
              setFormData({ ...formData, shortDesc: e.target.value })
            }
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase text-gray-600">
              Full Specifications
            </label>
            <div className="flex items-center gap-2">
              <select
                value={genLength}
                onChange={(e) =>
                  setGenLength(e.target.value as "short" | "medium" | "long")
                }
                className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-gray-50"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
              <button
                type="button"
                onClick={() => generateMutation.mutate()}
                disabled={generateMutation.isPending}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline disabled:opacity-50 cursor-pointer"
              >
                {generateMutation.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5" />
                )}
                {formData.fullDesc ? "Regenerate with AI" : "Generate with AI"}
              </button>
            </div>
          </div>
          <textarea
            rows={4}
            required
            placeholder="Provide detailed requirements, or click 'Generate with AI' above..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            value={formData.fullDesc}
            onChange={(e) =>
              setFormData({ ...formData, fullDesc: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-black text-white cursor-pointer font-medium py-3 rounded-lg text-sm hover:bg-black/80 flex items-center justify-center gap-2 duration-100"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Publishing...
            </>
          ) : (
            "Publish Sourcing Request"
          )}
        </button>
      </form>
    </div>
  );
}
