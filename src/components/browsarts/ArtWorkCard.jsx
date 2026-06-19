"use client";

import { CircleDollar } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";

export function ArtworkCard({ artWorks = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artWorks.map((artwork, index) => (
        <motion.div
          key={artwork._id || index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.05,
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.03 }}
        >
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

              <p className="text-sm text-default-500">
                By {artwork.artistName}
              </p>
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
              <Link
                href={`/browse-arts/${artwork._id}`}
                className="text-primary"
              >
                Buy Art
              </Link>
            </Card.Footer>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
