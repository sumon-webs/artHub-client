import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-default-100 to-background px-6">
      <div className="text-center max-w-md space-y-6">
        {/* Big Artistic 404 */}
        <div className="">
          <h1 className="text-[120px] font-extrabold text-primary/10 select-none">
            404
          </h1>

          <h2 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-default-900">
            Lost in Art 🎨
          </h2>
        </div>

        {/* Description */}
        <p className="text-default-500 leading-relaxed">
          The artwork you are looking for seems to have vanished into the
          creative void. It might have been moved, deleted, or never existed.
        </p>

        {/* Decorative line */}
        <div className="flex items-center gap-2 justify-center">
          <span className="h-px w-12 bg-default-300"></span>
          <span className="text-xs text-default-400">ArtHub</span>
          <span className="h-px w-12 bg-default-300"></span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button color="primary" className="w-full sm:w-auto">
              Explore Home
            </Button>
          </Link>

          <Link href="/browse-arts">
            <Button variant="bordered" className="w-full sm:w-auto">
              Browse Artworks
            </Button>
          </Link>
        </div>

        {/* Small hint */}
        <p className="text-xs text-default-400">
          Tip: Try searching for artworks or check your dashboard.
        </p>
      </div>
    </div>
  );
}
