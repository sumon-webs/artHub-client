import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export default function BoughtArtworksTable({ data = [] }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-3
        gap-3 sm:gap-4 md:gap-6
      "
    >
      {data.map((artwork) => (
        <div
          key={artwork._id}
          className="
            border
            border-slate-200 dark:border-slate-800
            rounded-xl
            overflow-hidden
            bg-white dark:bg-slate-900
            shadow-sm hover:shadow-md
            transition
          "
        >
          <Image
            src={artwork.imageUrl}
            alt={artwork.artWorkName}
            width={500}
            height={300}
            className="h-40 sm:h-44 md:h-52 w-full object-cover"
          />

          <div className="p-3 sm:p-4">
            <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
              {artwork.artWorkName}
            </h3>

            <Link href={`/dashboard/buyer/bought-artworks/${artwork?._id}`}>
              <Button
                color="primary"
                className="mt-3 w-full sm:w-auto"
                size="sm"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
