import React from "react";
import { ArtworkCard } from "../browsarts/ArtWorkCard";
import { getArtWorks } from "@/lib/api/artworks";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

const FeatureSection = async () => {
  const res = await getArtWorks();
  const artWorks = res?.data?.data || [];

  const featured = artWorks.slice(0, 6);

  return (
    <section className="w-full py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-b">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Featured Artworks
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Handpicked digital creations from top artists
        </p>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4">
        <ArtworkCard artWorks={featured} />
      </div>
      <div className="mt-10">
        <Link href="/browse-arts" className="flex justify-center">
          <Button
            size="lg"
            className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-3 rounded-xl font-medium shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Browse All Artworks
            <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
