"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Search,
  MapPin,
  DollarSign,
  Tag,
  Calendar,
  Compass,
  Loader2,
} from "lucide-react";
import { IItem } from "@/types/item";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type Item = IItem & { _id: string };

export default function ExploreRFPsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: items,
    isLoading,
    error,
  } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/items`);
      return res.data;
    },
  });

  const filteredItems = items?.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-sm text-secondary font-medium">
          Loading Sourcing Marketplace...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-medium">Failed to load RFPs.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-950 flex items-center gap-2">
            <Compass className="text-accent" /> Explore Procurement Requests
          </h1>
          <p className="text-xs text-secondary mt-1">
            Discover live corporate RFP contracts and supply chain demands.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search by title or specifications..."
              className="w-full bg-gray-50 pl-9 pr-4 py-2.5 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <select
              className="w-full bg-gray-50 px-4 py-2.5 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-primary font-medium text-gray-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Raw Materials">Raw Materials</option>
              <option value="Logistics">Logistics</option>
              <option value="Services">Services</option>
            </select>
          </div>
        </div>

        {filteredItems?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-sm text-secondary">
              No sourcing requests found matching your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-emerald-50 text-accent text-[10px] font-bold uppercase px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {item.category}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{" "}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base line-clamp-1 hover:text-primary transition cursor-pointer mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-secondary line-clamp-2 leading-relaxed mb-4">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="border-t border-gray-50 bg-gray-50/50 px-5 py-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-1 text-primary">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>
                        Est. {Number(item.budget).toLocaleString()} USD
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-secondary">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <Link
                    href={`/items/${item._id}`}
                    className="block w-full text-center bg-black text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
