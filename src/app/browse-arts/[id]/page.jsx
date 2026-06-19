import { ArtworkDetailsCard } from "@/components/browsarts/ArtWorkDetailsCard";
import { getArtworkDetails } from "@/lib/api/artworks";
import { getUserSession } from "@/lib/core/session";

const ArtWorkDetailspage = async ({ params }) => {
  const { id } = await params;
  const obj = await getArtworkDetails(id);
  const artwork = obj?.data?.data;

  const session = await getUserSession()
  const user = session?.user
  console.log(user)
  return (
    <div>
      <ArtworkDetailsCard artwork={artwork} user={user}/>
    </div>
  );
};

export default ArtWorkDetailspage;
