import ArtworksTable from "@/components/dahsboard/artist/artworksTable";
import { getArtWorks } from "@/lib/api/artworks";
import { getUserSession } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const ManageArtworksPage = async () => {
  const session = await getUserSession();
  const user = session?.user;

  const artistId = user?.id;

  const arts = await getArtWorks({ artistId });
  const artworks = arts?.data?.data || [];

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-slate-50 via-white to-slate-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        text-black dark:text-white
        p-4 md:p-8
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div
          className="
            flex flex-col md:flex-row
            md:items-center
            md:justify-between
            gap-4
            mb-8
          "
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Manage Artworks</h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              View, edit and manage your uploaded artworks
            </p>
          </div>

          <Link href="/dashboard/artist/add-artwork">
            <Button color="primary" className="w-full md:w-auto">
              + Add New Artwork
            </Button>
          </Link>
        </div>

        {/* CONTENT */}
        {artworks.length > 0 ? (
          <div
            className="
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              rounded-2xl
              shadow-sm
              overflow-hidden
            "
          >
            <ArtworksTable data={artworks} artistId={artistId} />
          </div>
        ) : (
          <div
            className="
              flex flex-col items-center justify-center
              text-center
              mt-24
              p-10
              bg-white/70 dark:bg-slate-900/60
              backdrop-blur
              border border-slate-200 dark:border-slate-800
              rounded-3xl
            "
          >
            <div className="text-5xl mb-4">🎨</div>

            <h2 className="text-xl font-semibold">No artworks found</h2>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              You haven’t added any artworks yet.
            </p>

            <Link href="/dashboard/artist/add-artwork" className="mt-6">
              <Button color="primary">Add Your First Artwork</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageArtworksPage;
