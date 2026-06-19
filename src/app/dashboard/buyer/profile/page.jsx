import { getOrders } from "@/lib/api/orders";
import { getUserSession } from "@/lib/core/session";
import { Avatar } from "@heroui/react";
import { Mail, Palette, PlusCircle, Pencil } from "lucide-react";
import Link from "next/link";

const BuyerProfilePage = async () => {
  const session = await getUserSession();
  const user = session?.user;

  const buyerId = user?.id;
  const res = await getOrders({ buyerId });
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Profile Header */}
        <div className="rounded-3xl border border-default-200 bg-content1 p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Avatar>
              <Avatar.Image alt={user?.name} src={user?.image} />
              <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className=" flex justify-between">
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome, {user?.name}
                </h1>
                <Link
                  href="/dashboard/buyer/profile/edit"
                  className="inline-flex items-center gap-2 rounded-xl border border-default-200 px-4 py-2 text-sm font-medium transition hover:bg-default-100"
                >
                  <Pencil size={16} />
                  Edit Profile
                </Link>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-default-500 md:justify-start">
                <Mail size={16} />
                <span>{user?.email}</span>
              </div>

              <p className="mt-4 max-w-2xl text-default-600">
                Manage your artworks, track your sales, and grow your artistic
                presence from one place.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-default-200 bg-content1 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Total Purchase</p>
                <h2 className="mt-2 text-3xl font-bold">{res?.data?.count || 0}</h2>
              </div>
              <Palette className="text-primary" size={30} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl border border-default-200 bg-content1 p-6">
          <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/dashboard/buyer/purchase-history"
              className="flex items-center gap-3 rounded-xl border border-default-200 p-5 transition hover:bg-default-100"
            >
              <div>
                <h3 className="font-semibold">See History</h3>
                <p className="text-sm text-default-500">
                  Here see you your purchase History  .
                </p>
              </div>
            </Link>

            <Link
              href="/browse-arts"
              className="flex items-center gap-3 rounded-xl border border-default-200 p-5 transition hover:bg-default-100"
            >
              <Palette className="text-primary" />
              <div>
                <h3 className="font-semibold">Buy Artworks</h3>
                <p className="text-sm text-default-500">
                  Buy your favourite arts.
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
