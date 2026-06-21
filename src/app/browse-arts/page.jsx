import BrowsArtsSection from "@/components/browsarts/BrowsArtsSection";
import { getArtWorks } from "@/lib/api/artworks";
import { Button } from "@heroui/react";
import Link from "next/link";

const BrowseArtspage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params.page || 1;
  const search = params.search || "";
  const category = params.category || "";
  const sortByPrice = params.sortByPrice || "";

  const arr = await getArtWorks({ page, search, category, sortByPrice });
  const arts = {
    items: arr?.data?.data || [],
  };
  const artWorks = arts?.items;
  const pagination = arr?.data?.pagination;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 transition-colors duration-300">
      {/* Header Section */}
      <div className="container mx-auto mb-10 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Explore Digital Art Gallery
        </h1>

        <p className="text-slate-500 dark:text-slate-300 mt-2 text-sm md:text-base">
          Discover unique artworks from talented creators around the world
        </p>
      </div>

      {/* Content */}
      {artWorks.length > 0 ? (
        <BrowsArtsSection pagination={pagination} initialData={artWorks} />
      ) : (
        <div className="container mx-auto text-center py-20">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300">
            No artworks found 😢
          </h2>
          <p className="text-slate-400 dark:text-slate-500 mt-2">
            Try again later or add new artworks.
          </p>
          <Link href={'/browse-arts'}><Button>Back</Button></Link>
        </div>
      )}
    </div>
  );
};

export default BrowseArtspage;
