import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function BoughtArtworksTable({ data = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((artwork) => (
        <div key={artwork._id} className="border rounded-xl overflow-hidden">
          <Image
            src={artwork.imageUrl}
            alt={artwork.artWorkName}
            width={500}
            height={300}
            className="h-52 w-full object-cover"
          />

          <div className="p-4">
            <h3 className="font-semibold">{artwork.artWorkName}</h3>

            <Link href={`/dashboard/buyer/bought-artworks/${artwork?._id}`}>
              <Button color="primary" className="mt-3" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
