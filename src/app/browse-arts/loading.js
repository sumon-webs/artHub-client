// components/browsarts/BrowseArtsSkeleton.jsx

const BrowseArtsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      {/* Top text */}
      <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800 mb-4" />

      {/* Filter Section */}
      <div className="flex flex-col lg:flex-row gap-3 mb-8 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Search Input */}
        <div className="w-full lg:w-1/2 h-[46px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800" />

        {/* Category Select */}
        <div className="w-full lg:w-1/4 h-[46px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800" />

        {/* Sort Select */}
        <div className="w-full lg:w-1/4 h-[46px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Artwork Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            {/* Image */}
            <div className="h-64 bg-slate-200 dark:bg-slate-800" />

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />

              <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />

              <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />

              <div className="flex justify-between items-center pt-2">
                <div className="h-5 w-20 rounded bg-slate-200 dark:bg-slate-800" />

                <div className="h-10 w-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />

        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseArtsSkeleton;
