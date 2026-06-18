"use client";

import { useEffect, useMemo, useState } from "react";
import { ArtworkCard } from "./ArtWorkCard";
import { getArtWorks } from "@/lib/api/artworks";

const BrowsArtsSection = ({ initialData }) => {
  const [data, setData] = useState(initialData || []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortByPrice, setSortByPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // unique categories
  const categories = useMemo(() => {
    const cats = initialData.map((item) => item.category);
    return ["all", ...new Set(cats)];
  }, [initialData]);

  // API call with debounce
  useEffect(() => {
    const delay = setTimeout(async () => {
      setLoading(true);

      const res = await getArtWorks({
        search,
        category,
        sortByPrice,
      });

      setData(res?.data?.data || []);
      setLoading(false);
    }, 400);

    return () => clearTimeout(delay);
  }, [search, category, sortByPrice]);

  return (
    <div className="container mx-auto">
      {/* Search + Filter + Sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search artworks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg
          bg-white dark:bg-slate-900
          text-slate-900 dark:text-white
          border-slate-200 dark:border-slate-700"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg
          bg-white dark:bg-slate-900
          text-slate-900 dark:text-white
          border-slate-200 dark:border-slate-700"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort by price */}
        <select
          value={sortByPrice}
          onChange={(e) => setSortByPrice(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg
          bg-white dark:bg-slate-900
          text-slate-900 dark:text-white
          border-slate-200 dark:border-slate-700"
        >
          <option value="">Sort by</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-slate-500 dark:text-slate-300 mb-4">
          Loading artworks...
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <ArtworkCard key={item._id} artwork={item} />
        ))}
      </div>
    </div>
  );
};

export default BrowsArtsSection;
