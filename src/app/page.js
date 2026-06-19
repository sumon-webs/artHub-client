import CategorySection from "@/components/Home/ArtCetagory";
import FeatureSection from "@/components/Home/FeatureSection";
import HeroSection from "@/components/Home/HeroSection";
import TopArtists from "@/components/Home/TopSellingArtist";

const Home = async () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <TopArtists />
      <CategorySection />
    </div>
  );
};

export default Home;
