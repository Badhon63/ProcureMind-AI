"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, DollarSign, MapPin, Tag } from "lucide-react";
import { IItem } from "@/types/item";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type Item = IItem & {
  _id: string;
};

export default function ItemDetailsPage() {
  const { id } = useParams();

  const { data: item, isLoading } = useQuery<Item>({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/items/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-6 sm:pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-80 bg-gray-200 animate-pulse"></div>

            <div className="p-8 space-y-5">
              <div className="flex gap-3">
                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-28 bg-gray-200 rounded-full animate-pulse"></div>
              </div>

              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>

              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen md:pt-24 pb-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore
        </Link>
        <img
          src={item!.imageUrl || "https://placehold.co/1000x500?text=No+Image"}
          alt={item!.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">{item!.title}</h1>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span>{item!.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${Number(item!.budget).toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{item!.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {item!.createdAt
                ? new Date(item!.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">
          Procurement Specification
        </h2>

        <p className="text-gray-700 whitespace-pre-wrap">{item!.fullDesc}</p>
      </div>
    </div>
  );
}
