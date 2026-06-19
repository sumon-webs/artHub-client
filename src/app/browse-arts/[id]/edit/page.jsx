import EditArtWorkForm from "@/components/dahsboard/artist/EditArtWorkForm";
import { getArtworkDetails } from "@/lib/api/artworks";

const page = async ({params}) => {
  const { id } = await params;
  const obj = await getArtworkDetails(id);
  const artwork = obj?.data?.data;
  return (
    <div className=" min-h-screen pt-22">
      <EditArtWorkForm artwork={artwork} />
    </div>
  );
};

export default page;
