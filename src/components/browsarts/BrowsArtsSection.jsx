import { ArtworkCard } from "./ArtWorkCard";

const BrowsArtsSection = ({ artWorks: data }) => {
  return (
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <ArtworkCard key={item._id} artwork={item} />
      ))}
    </div>
  );
};

export default BrowsArtsSection;
