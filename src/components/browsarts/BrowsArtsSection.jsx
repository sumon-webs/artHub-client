"use client";

import { Pagination } from "@heroui/react";
import { ArtworkCard } from "./ArtWorkCard";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const categories = [
  "abstract",
  "surreal",
  "3d-art",
  "ai-art",
  "photography",
  "modern",
  "minimalist",
  "digital-art",
  "realism",
];

const BrowsArtsSection = ({ initialData, pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const artworks = initialData;

  const limit = pagination?.limit || 9;
  const page = Number(pagination?.page || 1);
  const totalPages = pagination?.totalPages;
  const total = pagination?.total;

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState(searchParams.get("sortByPrice") || "");

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    else params.delete("search");

    if (category) params.set("category", category);
    else params.delete("category");

    if (sort) params.set("sortByPrice", sort);
    else params.delete("sortByPrice");

    params.set("page", 1);

    router.push(`/browse-arts?${params.toString()}`);
  }, [search, category, sort]);

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-slate-400 mb-4">
        Showing {initialData?.length} artworks
      </p>

      {/* FILTER WRAPPER */}
      <div
        className="
          flex flex-col lg:flex-row
          gap-3
          mb-8
          
          p-4
          rounded-2xl
          shadow-sm
          border border-slate-200 dark:border-slate-800
        "
      >
        {/* Search */}
        <input
          type="text"
          placeholder="Search artworks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full lg:w-1/2
            px-4 py-2.5
            rounded-xl
            border border-slate-200 dark:border-slate-700
            bg-transparent
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
    w-full lg:w-1/4
    px-4 py-2.5
    rounded-xl
    border border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-900
    text-slate-900 dark:text-white
    focus:outline-none focus:ring-2 focus:ring-indigo-500
  "
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
    w-full lg:w-1/4
    px-4 py-2.5
    rounded-xl
    border border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-900
    text-slate-900 dark:text-white
    focus:outline-none focus:ring-2 focus:ring-indigo-500
  "
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* GRID */}
      <div className="mb-8">
        <ArtworkCard artWorks={artworks} />
      </div>

      {/* PAGINATION WRAPPER */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Summary */}
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {start} – {end} of {total} results
        </p>

        {/* Pagination */}
        <div className="overflow-x-auto max-w-full">
          <Pagination size="sm">
            <Pagination.Summary>
              {start} to {end} of {total} results
            </Pagination.Summary>

            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous isDisabled={page === 1}>
                  <Link
                    href={`/browse-arts?page=${page - 1}&search=${search}&category=${category}&sortByPrice=${sort}`}
                  >
                    Prev
                  </Link>
                </Pagination.Previous>
              </Pagination.Item>

              {pages.map((p) => (
                <Pagination.Item key={p}>
                  <Link
                    href={`/browse-arts?page=${p}&search=${search}&category=${category}&sortByPrice=${sort}`}
                  >
                    <Pagination.Link isActive={p === page}>{p}</Pagination.Link>
                  </Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next isDisabled={page === totalPages}>
                  <Link
                    href={`/browse-arts?page=${page + 1}&search=${search}&category=${category}&sortByPrice=${sort}`}
                  >
                    Next
                  </Link>
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default BrowsArtsSection;
