import { getArtWorks } from "@/lib/api/artworks";
import { getTopArtists } from "@/lib/api/top-artist";
import { getUserSession } from "@/lib/core/session";
import { Avatar } from "@heroui/react";
import {
  Mail,
  Palette,
  DollarSign,
  ImageIcon,
  PlusCircle,
  Pencil,
} from "lucide-react";
import Link from "next/link";

const ArtistProfilePage = async () => {
  const session = await getUserSession();
  const user = session?.user;
  const artistId = user?.id;

  const artWorks = await getArtWorks({ artistId });

  const res = await getTopArtists({ artistId });
  const artistArr = res?.data?.data;
  const artistDetails = artistArr.find(art => art.totalSales)
  
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
                  href="/dashboard/artist/profile/edit"
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
                <p className="text-sm text-default-500">Total Artworks</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {artWorks?.data?.count}
                </h2>
              </div>
              <Palette className="text-primary" size={30} />
            </div>
          </div>

          <div className="rounded-2xl border border-default-200 bg-content1 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-500">Total Sales</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {artistDetails?.totalSales || 0}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-3xl border border-default-200 bg-content1 p-6">
          <h2 className="mb-5 text-xl font-semibold">Quick Actions</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="/dashboard/artist/add-artwork"
              className="flex items-center gap-3 rounded-xl border border-default-200 p-5 transition hover:bg-default-100"
            >
              <PlusCircle className="text-primary" />
              <div>
                <h3 className="font-semibold">Add New Artwork</h3>
                <p className="text-sm text-default-500">
                  Upload and showcase your latest creation.
                </p>
              </div>
            </a>

            <a
              href="/dashboard/artist/manage-artworks"
              className="flex items-center gap-3 rounded-xl border border-default-200 p-5 transition hover:bg-default-100"
            >
              <Palette className="text-primary" />
              <div>
                <h3 className="font-semibold">Manage Artworks</h3>
                <p className="text-sm text-default-500">
                  Edit, update, or remove existing artworks.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
