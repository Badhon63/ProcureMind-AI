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
} from "lucide-react";
import Link from "next/link";
import { IItem } from "@/types/item";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type Item = IItem & { _id: string };

export default function ExploreRFPsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

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

  const locations = [
    "All",
    ...(items ? [...new Set(items.map((item) => item.location))] : []),
  ];

  const filteredItems = items
    ?.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "All" || item.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "budgetHigh":
          return b.budget - a.budget;

        case "budgetLow":
          return a.budget - b.budget;

        case "oldest":
          return (
            new Date(a.createdAt || "").getTime() -
            new Date(b.createdAt || "").getTime()
          );

        case "newest":
        default:
          return (
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
          );
      }
    });

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-10 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <div className="h-7 w-72 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 sm: w-96 bg-gray-200 rounded mt-3 animate-pulse"></div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8">
            <div className="h-11 w-full bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="h-44 bg-gray-200 animate-pulse"></div>

                <div className="p-5 space-y-3">
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>

                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse"></div>

                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>

                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="border-t border-gray-100 px-5 py-4">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
    <div className="bg-gray-50 min-h-screen pt-10 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-950 flex items-center gap-2">
            <Compass className="text-accent hidden sm:block" />
            Explore Procurement Requests
          </h1>

          <p className="text-xs text-secondary mt-1">
            Discover live corporate RFP contracts and supply chain demands.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />

            <input
              type="text"
              placeholder="Search procurement requests..."
              className="w-full bg-gray-50 pl-9 pr-4 py-2.5 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap md:justify-end gap-5">
            <select
              className="bg-gray-50 px-4 py-2.5 rounded-lg text-sm border border-gray-200 focus:outline-1 outline-black/30"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Raw Materials">Raw Materials</option>
              <option value="Logistics">Logistics</option>
              <option value="Services">Services</option>
            </select>
            <select
              className="bg-gray-50 px-4 py-2.5 rounded-lg text-sm border border-gray-200 focus:outline-1 outline-black/30"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <select
              className="bg-gray-50 px-4 py-2.5 rounded-lg text-sm border border-gray-200 focus:outline-1 outline-black/30"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="budgetHigh">Budget: High to Low</option>
              <option value="budgetLow">Budget: Low to High</option>
            </select>
          </div>
        </div>

        {filteredItems?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
            <p className="text-sm text-secondary mb-4">
              No sourcing requests found matching your filters.
            </p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedLocation("All");
                setSortBy("newest");
              }}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredItems?.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
              >
                <img
                  src={
                    item.imageUrl ||
                    "https://placehold.co/600x400?text=ProcureMind+AI"
                  }
                  alt={item.title}
                  className="w-full h-44 object-cover"
                />

                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-emerald-50 text-accent text-[10px] font-bold uppercase px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {item.category}
                    </span>

                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-base line-clamp-1 mb-2 hover:text-primary transition">
                    {item.title}
                  </h3>

                  <p className="text-xs text-secondary line-clamp-3 leading-relaxed mb-4">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-1 text-primary">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>{Number(item.budget).toLocaleString()} USD</span>
                    </div>

                    <div className="flex items-center gap-1 text-secondary">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate max-w-20">{item.location}</span>
                    </div>
                  </div>

                  <Link
                    href={`/items/${item._id}`}
                    className="block w-full text-center bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition"
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
