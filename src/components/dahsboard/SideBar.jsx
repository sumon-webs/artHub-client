"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Palette,
  PlusCircle,
  History,
  User,
  ShoppingBag,
  BarChart3,
  ReceiptText,
  Users,
  PrinterCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Comment } from "@gravity-ui/icons";

const homeLink = {
  name: "Home",
  href: "/",
  icon: Home,
};

const adminLinks = [
  { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
  {
    name: "Manage All Artworks",
    href: "/dashboard/admin/manage-artworks",
    icon: Palette,
  },
  {
    name: "View All Transactions",
    href: "/dashboard/admin/transactions",
    icon: ReceiptText,
  },
  {
    name: "Analytics Overview",
    href: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
];

const artistLinks = [
  {
    name: "Manage Artworks",
    href: "/dashboard/artist/manage-artworks",
    icon: Palette,
  },
  {
    name: "Add Artwork",
    href: "/dashboard/artist/add-artwork",
    icon: PlusCircle,
  },
  {
    name: "Sales History",
    href: "/dashboard/artist/sales-history",
    icon: History,
  },
  { name: "Profile Management", href: "/dashboard/artist/profile", icon: User },
];

const buyerLinks = [
  {
    name: "Purchase History",
    href: "/dashboard/buyer/purchase-history",
    icon: History,
  },
  {
    name: "Bought Artworks",
    href: "/dashboard/buyer/bought-artworks",
    icon: ShoppingBag,
  },
  { name: "Profile Management", href: "/dashboard/buyer/profile", icon: User },
  {
    name: "Pricing Management",
    href: "/dashboard/buyer/pricing",
    icon: PrinterCheck,
  },
  {
    name: "Comment Management",
    href: "/dashboard/buyer/coments",
    icon: Comment,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const roleLinks = {
    admin: adminLinks,
    artist: artistLinks,
    buyer: buyerLinks,
  };

  const sideBarLinks = [homeLink, ...(roleLinks[user?.role] || [])];

  if (isPending) {
    return (
      <aside className="w-72 min-h-screen border-r bg-background p-6">
        <p className="text-sm text-default-500">Loading sidebar...</p>
      </aside>
    );
  }

  return (
    <aside
      className="
        w-72
        min-h-screen
        border-r
        border-default-200
        bg-background
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="p-6 border-b border-default-200">
        <h2 className="text-2xl font-bold">ArtsHub</h2>

        <p className="text-sm text-default-500 capitalize">
          {user?.role ? `${user.role} Dashboard` : "Dashboard"}
        </p>
      </div>

      {/* NAV */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {sideBarLinks.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition-all
                duration-200

                hover:bg-slate-100 dark:hover:bg-zinc-800

                ${
                  active
                    ? "bg-indigo-500 text-white shadow-md"
                    : "text-slate-700 dark:text-slate-300"
                }
              `}
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
