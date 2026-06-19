import { getTopArtists } from "@/lib/api/top-artist";
import { Avatar } from "@heroui/react";

export default async function TopArtists() {
  const res = await getTopArtists();
  const artists = res?.data?.data || [];

  return (
    <section className="w-full dark:bg-slate-950 border-b py-23">
      <div className="mx-auto container px-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground text-center">
            🏆 Top Selling Artists
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {artists.slice(0, 3).map((artist) => (
            <div
              key={artist._id}
              className="flex items-center gap-4 rounded-2xl border bg-background p-4 shadow-sm"
            >
              <Avatar>
                <Avatar.Image alt={artist.artistName} src={artist.image} />
                <Avatar.Fallback>{artist.artistName?.[0]}</Avatar.Fallback>
              </Avatar>

              <h3 className="text-lg font-semibold text-foreground">
                {artist.artistName}
              </h3>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {artists.length === 0 && (
          <div className="mt-10 text-center text-muted-foreground">
            No artist data found
          </div>
        )}
      </div>
    </section>
  );
}
