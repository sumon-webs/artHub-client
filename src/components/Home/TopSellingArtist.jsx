import { getTopArtists } from "@/lib/api/top-artist";
import { Avatar } from "@heroui/react";
import { Trophy, Palette } from "lucide-react";

export default async function TopArtists() {
  const res = await getTopArtists();
  const artists = res?.data?.data || [];

  return (
    <section className="w-full border-b bg-slate-50 py-20 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            <Trophy className="size-5" />
            Top Creators
          </div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            🏆 Top Selling Artists
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Meet the most successful artists in our marketplace
          </p>
        </div>

        {/* Artists Grid */}
        {artists.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artists.slice(0, 3).map((artist, index) => (
              <div
                key={artist._id}
                className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Rank Badge */}
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                  #{index + 1}
                </div>

                <div className="flex flex-col items-center text-center">
                  <Avatar>
                    <Avatar.Image
                      src={artist.image}
                      alt={artist.artistName}
                      className="h-20 w-20 border-4 border-slate-200 dark:border-slate-700"
                    />
                    <Avatar.Fallback>{artist.artistName?.[0]}</Avatar.Fallback>
                  </Avatar>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                    {artist.artistName}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Featured Digital Artist
                  </p>

                  <div className="mt-5 flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm dark:bg-slate-800">
                    <Palette className="size-4" />
                    Top Seller
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed py-20 text-center">
            <Palette className="mb-4 size-16 text-slate-400" />

            <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
              No Artists Found
            </h3>

            <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
              There are currently no top-selling artists available. Please check
              back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
