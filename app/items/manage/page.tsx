"use client";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2, Eye, LayoutDashboard } from "lucide-react";

export default function ManageItemsPage() {
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/items");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      alert("Item deleted successfully!");
    },
  });

  if (isLoading)
    return <div className="text-center pt-24">Loading Dashboard...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <LayoutDashboard className="text-accent" /> Manage Sourcing Requests
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
              {items?.map((item: any) => (
                <tr key={item._id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4 font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-xs px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 font-semibold">${item.budget}</td>
                  <td className="p-4 text-secondary">{item.location}</td>
                  <td className="p-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        if (confirm("Are you sure?"))
                          deleteMutation.mutate(item._id);
                      }}
                      className="p-2 text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
