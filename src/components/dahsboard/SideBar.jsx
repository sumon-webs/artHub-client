"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  PlusCircle,
  Pencil,
  History,
  User,
  ShoppingBag,
  BarChart3,
  ReceiptText,
  Users,
  PrinterCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const adminLinks = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
  { name: "Manage All Artworks", href: "/dashboard/admin/manage-artworks", icon: Palette },
  { name: "View All Transactions", href: "/dashboard/admin/transactions", icon: ReceiptText },
  { name: "Analytics Overview", href: "/dashboard/admin/analytics", icon: BarChart3 },
];

const artistLinks = [
  { name: "Dashboard", href: "/dashboard/artist", icon: LayoutDashboard },
  { name: "Manage Artworks", href: "/dashboard/artist/manage-artworks", icon: Palette },
  { name: "Add Artwork", href: "/dashboard/artist/add-artwork", icon: PlusCircle },
  { name: "Sales History", href: "/dashboard/artist/sales-history", icon: History },
  { name: "Profile Management", href: "/dashboard/artist/profile", icon: User },
];

const buyerLinks = [
  { name: "Purchase History", href: "/dashboard/buyer/purchase-history", icon: History },
  { name: "Bought Artworks", href: "/dashboard/buyer/bought-artworks", icon: ShoppingBag },
  { name: "Profile Management", href: "/dashboard/buyer/profile", icon: User },
  { name: "Pricing Management", href: "/dashboard/buyer/pricing", icon: PrinterCheck },


];

export default function Sidebar() {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // ROLE BASED LINKS
  const roleLinks = {
    admin: adminLinks,
    artist: artistLinks,
    buyer: buyerLinks,
  };

  const sideBarLinks = roleLinks[user?.role] || [];

  // loading state
  if (isPending) {
    return (
      <aside className="w-72 min-h-screen border-r border-default-200 bg-background p-6">
        <p className="text-sm text-default-500">Loading sidebar...</p>
      </aside>
    );
  }

  return (
    <aside className="w-72 min-h-screen border-r border-default-200 bg-background">
      {/* HEADER */}
      <div className="p-6 border-b border-default-200">
        <h2 className="text-2xl font-bold">ArtsHub</h2>

        <p className="text-sm text-default-500 capitalize">
          {user?.role
            ? `${user.role} Dashboard`
            : "Dashboard"}
        </p>
      </div>

      {/* LINKS */}
      <nav className="p-4 space-y-2">
        {sideBarLinks.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? " shadow-md bg-blue-300 text-black"
                  : ""
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}