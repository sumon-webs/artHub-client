import React from "react";
import { Card, Button } from "@heroui/react";
import { User, Image, DollarSign, Palette } from "lucide-react";
import Link from "next/link";
import { getArtWorks } from "@/lib/api/artworks";
import { getUserSession } from "@/lib/core/session";
import { getTopArtists } from "@/lib/api/top-artist";

const ArtistDashobardHome = async () => {
  const session = await getUserSession();
  const user = session?.user;
  const artistId = user?.id;

  const artWorks = await getArtWorks({ artistId });

  const res = await getTopArtists({ artistId });
  const artistArr = res?.data?.data;
  const artistDetails = artistArr.find((art) => art.totalSales);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto container space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Artist Dashboard
          </h1>
          <p className="text-default-500 mt-1">
            Manage your artworks, profile, and earnings in one place.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <Palette className="text-primary" />
            <div>
              <p className="text-sm text-default-500">Total Artworks</p>
              <h3 className="text-xl font-bold">
                {artWorks?.data?.count || 0}
              </h3>
            </div>
          </Card>

          <Card>
            <DollarSign className="text-warning" />
            <div>
              <p className="text-sm text-default-500">Earnings</p>
              <h3 className="text-xl font-bold">
                ${artistDetails.totalRevenue}
              </h3>
            </div>
          </Card>
          <Card>
            <Palette className="text-primary" />
            <div>
              <p className="text-sm text-default-500">Total Artworks</p>
              <h3 className="text-xl font-bold">
                {artistDetails.totalSales || 0}
              </h3>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <div>
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <p className="text-default-500">
              Upload new artwork or manage your portfolio
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard/artist/add-artwork">
              <Button color="primary">Add Artwork</Button>
            </Link>

            <Link href="/dashboard/artist/manage-artworks">
              <Button variant="bordered">View All</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ArtistDashobardHome;
