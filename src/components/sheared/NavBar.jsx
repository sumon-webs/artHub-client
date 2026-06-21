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
    <nav className="border-b bg-white dark:bg-zinc-950 dark:border-zinc-800 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold"
          >
            <Image src="/ah.png" alt="ArtHub" width={32} height={32} />
            ArtHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
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

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-zinc-950 shadow-lg transform transition-transform duration-300 md:hidden z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-zinc-800">
          <span className="font-bold">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 dark:text-gray-300"
            >
              {link.name}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            Toggle Theme
          </button>

          {/* Auth */}
          <div className="pt-4 border-t dark:border-zinc-800">
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
