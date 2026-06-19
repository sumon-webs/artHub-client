import { ArtworkDetailsCard } from "@/components/browsarts/ArtWorkDetailsCard";
import DeleteModal from "@/components/dahsboard/artist/DeleteModal";
import { getArtworkDetails } from "@/lib/api/artworks";
import { getUserSession } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Link from "next/link";

const ArtWorkDetailspage = async ({ params }) => {
  const { id } = await params;
  const obj = await getArtworkDetails(id);
  const artwork = obj?.data?.data;

  const session = await getUserSession();
  const user = session?.user;

  const isOwned = artwork?.artistId === user?.id;
  return (
    <div className=" container mx-auto">
      {isOwned && (
        <div className="flex justify-end gap-3">
          <Link href={`/browse-arts/${artwork?._id}/edit`}>
            <Button color="primary" variant="shadow">
              ✏️ Edit Artwork
            </Button>
          </Link>
          <DeleteModal artwork={artwork} />
        </div>
      )}
      <ArtworkDetailsCard artwork={artwork} user={user} />
    </div>
  );
};

export default ArtWorkDetailspage;
