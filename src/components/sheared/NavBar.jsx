"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { ThemeSwitch } from "../ThemeSwitch";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Arts", href: "/browse-arts" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { theme } = useTheme();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    setIsOpen(false);
  };

  const dashboardLink =
    user?.role === "admin"
      ? { name: "Dashboard", href: "/dashboard/admin/manage-users" }
      : user?.role === "artist"
        ? { name: "Dashboard", href: "/dashboard/artist/manage-artworks" }
        : user?.role === "buyer"
          ? { name: "Dashboard", href: "/dashboard/buyer/purchase-history" }
          : null;

  const links = dashboardLink ? [...navLinks, dashboardLink] : navLinks;

  return (
    <nav className="border-b bg-white dark:bg-zinc-950 dark:border-zinc-800 relative transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground"
          >
            <Image src="/ah.png" alt="ArtHub" width={32} height={32} />
            ArtHub
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 text-foreground">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}

            <ThemeSwitch />

            {user ? (
              <div className="flex items-center gap-3">
                <Avatar>
                  <Avatar.Image src={user?.image} alt={user?.name} />
                  <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                </Avatar>

                <Button
                  size="sm"
                  onClick={handleLogout}
                  className="bg-red-500 text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="bg-black text-white px-4 py-2 rounded-lg dark:bg-white dark:text-black"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 z-50 md:hidden
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          bg-white dark:bg-zinc-950
          text-black dark:text-white
          shadow-xl
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b dark:border-zinc-800">
          <span className="font-bold">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        {/* LINKS */}
        <div className="p-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}

          {/* THEME */}
          <div className="pt-4 border-t dark:border-zinc-800">
            <ThemeSwitch />
          </div>

          {/* AUTH */}
          <div className="pt-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-black text-white py-2 rounded-lg dark:bg-white dark:text-black"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
