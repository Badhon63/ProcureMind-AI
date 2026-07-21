"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Trash2,
  LayoutDashboard,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";
import { IItem } from "@/types/item";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type Item = IItem & { _id: string };

export default function ManageItemsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const {
    data: items,
    isLoading,
    isError,
  } = useQuery<Item[]>({
    queryKey: ["items", "mine", session?.user?.id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/items/mine`, {
        params: { userId: session?.user?.id },
      });
      return res.data;
    },
    enabled: !!session?.user?.id,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/api/items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", "mine"] });
      toast.success("Item deleted successfully!");
      setItemToDelete(null);
    },
    onError: () => {
      toast.error("Failed to delete item. Please try again.");
      setItemToDelete(null);
    },
  });

  if (isSessionLoading || isLoading) {
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
          Please log in to view your sourcing requests.
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

  if (isError) {
    return (
      <div className="text-center pt-24 text-red-500 flex flex-col items-center gap-2">
        <AlertCircle className="w-6 h-6" />
        Failed to load items.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <LayoutDashboard className="text-accent" /> Manage Sourcing Requests
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {items && items.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-secondary">
                  <th className="p-4">Project Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Location</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-xs px-2.5 py-1 rounded-md">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">
                      ${Number(item.budget).toLocaleString()}
                    </td>
                    <td className="p-4 text-secondary">{item.location}</td>
                    <td className="p-4 flex items-center justify-center gap-3">
                      <Link
                        href={`/items/${item._id}`}
                        className="p-2 text-blue-500 hover:blue-red-700 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="p-2 text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <p className="text-secondary text-sm mb-4">
                No sourcing requests yet.
              </p>

              <Link
                href="/items/add"
                className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
              >
                Create Your First Procurement Request
              </Link>
            </div>
          )}
        </div>
      </div>

      {itemToDelete && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={() => setItemToDelete(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-red-50 p-2 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold text-gray-900">Delete request?</h3>
            </div>
            <p className="text-sm text-secondary mb-6">
              This will permanently remove{" "}
              <span className="font-medium text-gray-900">
                &quot;{itemToDelete.title}&quot;
              </span>
              . This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-50 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(itemToDelete._id)}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
