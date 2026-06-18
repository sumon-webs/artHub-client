import BrowsArtsSection from "@/components/browsarts/BrowsArtsSection";
import { getArtWorks } from "@/lib/api/artworks";

const BrowseArtspage = async() => {
  const arr = await getArtWorks()
  const artWorks = arr?.data?.data
  console.log(artWorks)
  return (
    <BrowsArtsSection artWorks={artWorks}/>
  );
};

export default BrowseArtspage;
