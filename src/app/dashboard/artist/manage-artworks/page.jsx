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
  const arts = await getArtWorks({artistId});
  const artworks = arts?.data?.data || [];
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white p-6">
      <div className=" flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Manage Artworks</h1>
        <Link href={"/dashboard/artist/add-artwork"}>
          <Button>Add new ArtWork</Button>
        </Link>
      </div>
      {artworks.length > 0 ? (
        <ArtworksTable data={artworks} />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <h2 className="text-xl font-semibold">No artworks found</h2>
          <p className="text-gray-500 mt-2">
            You haven’t added any artworks yet.
          </p>
          <Link href={"/dashboard/artist/add-artwork"}>
            <Button>Add ArtWork</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ManageArtworksPage;
