"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ThemeSwitch } from "../ThemeSwitch";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Arts", href: "/browse-arts" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
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
    <nav className="border-b bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-black dark:text-white"
          >
            <Image
              src="/ah.png"
              alt="ArtHub Logo"
              width={32}
              height={32}
              className="rounded-md"
              priority
            />
            ArtHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-gray-700 transition hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <ThemeSwitch />

            {/* Auth Button */}
            {user ? (
              <div className=" flex items-center gap-2">
                <Avatar>
                  <Avatar.Image alt={user?.name} src={user?.image} />
                  <Avatar.Fallback>Hi</Avatar.Fallback>
                </Avatar>
                <Button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <Button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="space-y-4 border-t py-4 md:hidden dark:border-zinc-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} />
                  Dark Mode
                </>
              )}
            </button>

            {/* Mobile Auth */}
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/signin"
                className="block rounded-lg bg-black px-4 py-2 text-center text-white dark:bg-white dark:text-black"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
