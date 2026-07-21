"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Calendar, DollarSign, MapPin, Tag } from "lucide-react";
import { IItem } from "@/types/item";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type Item = IItem & {
  _id: string;
};

export default function ItemDetailsPage() {
  const { id } = useParams();

  const {
    data: item,
    isLoading,
    error,
  } = useQuery<Item>({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/items/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load item.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

        <img
          src={
            item.imageUrl ||
            "https://placehold.co/1000x500?text=No+Image"
          }
          alt={item.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">
          {item.title}
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">

          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span>{item.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${Number(item.budget).toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">
          Procurement Specification
        </h2>

        <p className="text-gray-700 whitespace-pre-wrap">
          {item.fullDesc}
        </p>

      </div>
    </div>
  );
}