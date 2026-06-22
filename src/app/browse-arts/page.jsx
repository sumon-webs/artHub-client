import BrowsArtsSection from "@/components/browsarts/BrowsArtsSection";
import { getArtWorks } from "@/lib/api/artworks";
import { Button } from "@heroui/react";
import Link from "next/link";

const BrowseArtspage = async ({ searchParams }) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const search = params?.search || "";
  const category = params?.category || "";
  const sortByPrice = params?.sortByPrice || "";

  const response = await getArtWorks({
    page,
    search,
    category,
    sortByPrice,
  });

  const artWorks = response?.data?.data || [];
  const pagination = response?.data?.pagination || {};
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Digital Art Marketplace
          </span>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Explore Stunning Digital Artworks
          </h1>

          <p className="mt-5 text-slate-600 dark:text-slate-300 text-base md:text-lg">
            Discover, collect, and connect with talented artists from around the
            world.
          </p>
        </div>
      </div>

      {/* Arts Section */}
      {artWorks.length > 0 ? (
        <BrowsArtsSection initialData={artWorks} pagination={pagination} />
      ) : (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-lg mx-auto text-center border border-slate-200 dark:border-slate-800 rounded-3xl p-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
            <div className="text-6xl mb-4">🎨</div>

            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
              No Artworks Found
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              We couldn't find any artworks matching your search criteria.
              Please try different filters or browse all artworks.
            </p>

            <Link href="/browse-arts">
              <Button color="primary" className="mt-6" radius="full">
                Browse All Arts
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default BrowseArtspage;
