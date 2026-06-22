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
    <section className=" py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-b">
      <div className=" container mx-auto">
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
        {featured.length > 0 ? (
          <ArtworkCard artWorks={featured} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
              No Artworks Available
            </h3>

            <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
              There are currently no featured artworks to display. Please check
              back later for new and exciting creations from our artists.
            </p>

            <Link href="/browse-arts" className="mt-6">
              <Button color="primary" variant="flat">
                Explore Gallery
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureSection;
