"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden 
      bg-white text-black 
      dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-black 
      dark:text-white"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        {/* Light mode glow */}
        <div className="absolute w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-3xl top-10 left-10 dark:hidden" />
        <div className="absolute w-[350px] h-[350px] bg-blue-200/40 rounded-full blur-3xl bottom-10 right-10 dark:hidden" />

        {/* Dark mode glow */}
        <div className="absolute hidden dark:block w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute hidden dark:block w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl py-28">
        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Discover & Buy <br />
          <span className="text-purple-500 dark:text-purple-400">
            Original Art
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-gray-600 dark:text-gray-300 text-lg"
        >
          Explore unique digital artworks from talented creators around the
          world.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8"
        >
          <Link href={'/browse-arts'}>
            <Button
              size="lg"
              className="
              bg-purple-500 text-white 
              hover:bg-purple-600 
              dark:bg-purple-500 dark:hover:bg-purple-600 
              px-8 py-6 text-lg rounded-2xl
            "
            >
              Browse Artworks
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
