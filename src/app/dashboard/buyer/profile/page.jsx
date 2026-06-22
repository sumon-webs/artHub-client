import { getOrders } from "@/lib/api/orders";
import { getUserSession } from "@/lib/core/session";
import { Avatar } from "@heroui/react";
import { Mail, Palette, Pencil } from "lucide-react";
import Link from "next/link";

const BuyerProfilePage = async () => {
  const session = await getUserSession();
  const user = session?.user;

  const buyerId = user?.id;
  const res = await getOrders({ buyerId });

  return (
    <div
      className="
        min-h-screen
        px-4 py-6 md:px-8 md:py-10
        bg-gradient-to-br from-slate-50 via-white to-slate-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        space-y-8
        transition-colors
      "
    >
      <div className="max-w-7xl mx-auto space-y-8">

        {/* PROFILE CARD */}
        <div
          className="
            rounded-3xl
            border border-slate-200 dark:border-slate-800
            bg-white/70 dark:bg-slate-900/60
            backdrop-blur-xl
            p-6 md:p-8
            shadow-lg
          "
        >
          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* AVATAR */}
            <Avatar className="w-20 h-20">
              <Avatar.Image alt={user?.name} src={user?.image} />
              <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
            </Avatar>

            {/* INFO */}
            <div className="flex-1 text-center md:text-left space-y-2">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                  Welcome, {user?.name}
                </h1>

                <Link
                  href="/dashboard/buyer/profile/edit"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl border
                    border-slate-200 dark:border-slate-700
                    px-4 py-2 text-sm font-medium
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    transition
                  "
                >
                  <Pencil size={16} />
                  Edit Profile
                </Link>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-slate-400">
                <Mail size={16} />
                <span className="text-sm md:text-base">{user?.email}</span>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                Manage your artworks, track your purchases, and explore new art
                from one place.
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div
            className="
              rounded-2xl
              border border-slate-200 dark:border-slate-800
              bg-white/70 dark:bg-slate-900/60
              p-6
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Purchase
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                  {res?.data?.count || 0}
                </h2>
              </div>

              <Palette className="text-primary" size={30} />
            </div>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div
          className="
            rounded-3xl
            border border-slate-200 dark:border-slate-800
            bg-white/70 dark:bg-slate-900/60
            backdrop-blur-xl
            p-6
            shadow-lg
          "
        >
          <h2 className="mb-5 text-xl font-semibold text-slate-800 dark:text-white">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Link
              href="/dashboard/buyer/purchase-history"
              className="
                flex items-center gap-3
                rounded-xl border
                border-slate-200 dark:border-slate-800
                p-5
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition
              "
            >
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  Purchase History
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  View all your past purchases
                </p>
              </div>
            </Link>

            <Link
              href="/browse-arts"
              className="
                flex items-center gap-3
                rounded-xl border
                border-slate-200 dark:border-slate-800
                p-5
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition
              "
            >
              <Palette className="text-primary" />
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  Buy Artworks
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Explore and buy new artworks
                </p>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
};

export default BuyerProfilePage;