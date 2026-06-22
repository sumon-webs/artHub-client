"use client";

import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { FaFacebook, FaGithub } from "react-icons/fa";
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
      className="
        border-t border-slate-200
        bg-gradient-to-b from-white to-slate-50
        dark:border-slate-800
        dark:from-slate-950 dark:to-black
        dark:bg-gradient-to-b
        transition-colors duration-300
      "
    >
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              🎨 ArtHub
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
              Discover and buy original digital artworks from talented creators
              worldwide.
            </p>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-500">
              © {new Date().getFullYear()} ArtHub. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-slate-600 dark:text-slate-400
                      transition-all duration-300
                      hover:text-primary hover:translate-x-1 inline-block
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
              Newsletter
            </h3>

            <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
              Get updates about new artworks and featured artists.
            </p>

            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                variant="bordered"
                classNames={{
                  inputWrapper:
                    "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700",
                }}
              />

              <Button color="primary">Join</Button>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="
                      rounded-xl border border-slate-200
                      bg-white p-3 text-slate-700
                      transition-all duration-300

                      hover:-translate-y-1
                      hover:border-primary
                      hover:text-primary
                      hover:shadow-lg

                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-300
                    "
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Made with ❤️ by ArtHub Team
        </div>
      </div>
    </footer>
  );
}
