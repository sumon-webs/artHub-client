"use client";

import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { FaFacebook, FaGithub , } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

const socialLinks = [
  { icon: FaFacebook, href: "#" },
  { icon: BsTwitter, href: "#" },
  { icon: BsInstagram, href: "#" },
  { icon: FaGithub, href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="border-t 
      bg-white text-gray-700 
      dark:bg-zinc-950 dark:text-gray-300 dark:border-zinc-800"
    >
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand + Copyright */}
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              🎨 ArtHub
            </h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Discover and buy original digital artworks from creators worldwide.
            </p>

            <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} ArtHub. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-black dark:hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">
              Newsletter
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Get updates about new artworks.
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-gray-100 dark:bg-zinc-900"
              />
              <Button className="bg-purple-500 text-white">
                Join
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 
                    dark:bg-zinc-900 dark:hover:bg-zinc-800 transition"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}