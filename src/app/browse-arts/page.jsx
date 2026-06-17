import React from "react";

const arts = [];

const BrowseArtspage = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-white px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
          Browse Arts
        </h1>

        {arts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-24 dark:border-zinc-700">
            <span className="mb-4 text-6xl">🎨</span>

            <h2 className="text-2xl font-semibold text-black dark:text-white">
              No Arts Available
            </h2>

            <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
              There are currently no artworks available.
              <br />
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Arts cards will go here */}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseArtspage;
