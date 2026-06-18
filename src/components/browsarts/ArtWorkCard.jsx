import { CircleDollar } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";
import Image from "next/image";

export function ArtworkCard({ artwork }) {
  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-[220px]">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Header */}
      <Card.Header className="flex flex-col gap-1">
        <Card.Title className="text-lg font-semibold">
          {artwork.title}
        </Card.Title>

        <Card.Description>{artwork.description}</Card.Description>

        {/* Artist Name */}
        <p className="text-sm text-default-500">By {artwork.artistName}</p>
      </Card.Header>

      {/* Price + Category */}
      <div className="px-4 pb-2 flex items-center justify-between text-sm text-default-600">
        <div className="flex items-center gap-1">
          <CircleDollar className="text-primary size-5" />
          <span>{artwork.price}</span>
        </div>

        <span className="px-2 py-1 rounded-full bg-default-100 text-xs">
          {artwork.category}
        </span>
      </div>

      {/* Footer */}
      <Card.Footer>
        <Link href={`/artist/${artwork.artistId}`} className="text-primary">
          View Artist
          <Link.Icon />
        </Link>
      </Card.Footer>
    </Card>
  );
}
