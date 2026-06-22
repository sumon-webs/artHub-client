"use client";

import { CircleDollar } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";

export function ArtworkCard({ artWorks = [] }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        gap-3 sm:gap-4 md:gap-6
      "
    >
      {artWorks.map((artwork, index) => (
        <motion.div
          key={artwork._id || index}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, delay: index * 0.02 }}
          whileHover={{ scale: 1.02 }}
          className="h-full"
        >
          <Card
            className="
              h-full flex flex-col
              overflow-hidden
              rounded-xl sm:rounded-2xl
              border border-slate-200 dark:border-slate-800
              bg-white dark:bg-slate-900
              shadow-sm hover:shadow-xl
              transition-all duration-200
            "
          >
            {/* IMAGE */}
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>

            {/* CONTENT */}
            <Card.Header className="flex flex-col gap-1 px-3 sm:px-4 pt-3">
              <Card.Title className="text-sm sm:text-base font-semibold line-clamp-1 text-slate-800 dark:text-white">
                {artwork.title}
              </Card.Title>

              <Card.Description className="text-xs sm:text-sm line-clamp-2 text-slate-500 dark:text-slate-400">
                {artwork.description}
              </Card.Description>

              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                By {artwork.artistName}
              </p>
            </Card.Header>

            {/* PRICE + CATEGORY */}
            <div className="mt-auto px-3 sm:px-4 pb-2 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <CircleDollar className="text-primary size-4 sm:size-5" />
                <span>{artwork.price}</span>
              </div>

              <span
                className="
                  px-2 py-0.5
                  rounded-full
                  text-[10px] sm:text-xs
                  bg-slate-100 dark:bg-slate-800
                  text-slate-600 dark:text-slate-300
                "
              >
                {artwork.category}
              </span>
            </div>

            {/* FOOTER */}
            <Card.Footer className="px-3 sm:px-4 pb-3">
              <Link
                href={`/browse-arts/${artwork._id}`}
                className="
                  text-primary
                  text-xs sm:text-sm
                  font-medium
                  hover:underline
                "
              >
                Buy Art →
              </Link>
            </Card.Footer>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}