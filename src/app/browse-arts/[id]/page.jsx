import { ArtworkDetailsCard } from "@/components/browsarts/ArtWorkDetailsCard";
import DeleteModal from "@/components/dahsboard/artist/DeleteModal";
import { getArtworkDetails } from "@/lib/api/artworks";
import { getOrders } from "@/lib/api/orders";
import { getPlans } from "@/lib/api/plans";
import { getUserSession } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Link from "next/link";

const ArtWorkDetailspage = async ({ params }) => {
  const { id } = await params;
  const obj = await getArtworkDetails(id);
  const artwork = obj?.data?.data;

  const session = await getUserSession();
  const user = session?.user;

  const buyerId = user?.id;

  const artist = user?.role === "artist";
  const isOwned = artwork?.artistId === user?.id;
  const planId = user?.plan;

  const orderRes = await getOrders({ buyerId });
  const myOrders = orderRes?.data?.data || [];

  const planObj = await getPlans({ planId });
  const plan = planObj?.data;
  const limitReached = plan?.max !== undefined && myOrders.length >= plan.max;

  return (
    <div className=" container mx-auto">
      {isOwned && artist && (
        <div className="flex justify-end gap-3">
          <Link href={`/browse-arts/${artwork?._id}/edit`}>
            <Button color="primary" variant="shadow">
              ✏️ Edit Artwork
            </Button>
          </Link>
          <DeleteModal artwork={artwork} />
        </div>
      )}
      <ArtworkDetailsCard
        limitReached={limitReached}
        artwork={artwork}
        user={user}
      />
    </div>
  );
};

export default ArtWorkDetailspage;
