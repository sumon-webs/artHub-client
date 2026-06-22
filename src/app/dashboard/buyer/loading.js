const BuyerDashboardSkeleton = () => {
  return (
    <div className="min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4 sm:space-y-5 max-w-md">
        {/* Spinner */}
        <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full border-4 sm:border-[5px] border-indigo-500/20 border-t-indigo-600 animate-spin" />

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Loading Buyer Dashboard...
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Preparing your creative workspace ✨
        </p>
      </div>
    </div>
  );
};

export default BuyerDashboardSkeleton;