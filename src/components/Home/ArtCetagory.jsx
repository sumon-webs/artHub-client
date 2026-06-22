const categories = [
  "abstract",
  "modern",
  "minimalist",
  "digital-art",
  "realism",
  "surreal",
];

export default function CategorySection() {
  return (
    <section className="w-full py-10 md:py-23 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 dark:text-white">
          🎨 Browse Categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="
                group cursor-pointer rounded-2xl border
                border-slate-200 bg-white
                dark:border-slate-800 dark:bg-slate-900

                p-5 text-center shadow-sm
                transition-all duration-300

                hover:-translate-y-2
                hover:shadow-xl
                hover:border-primary
                dark:hover:border-primary
              "
            >
              <p
                className="
                  text-sm font-semibold capitalize
                  text-slate-700 dark:text-slate-200
                  transition-colors duration-300

                  group-hover:text-primary
                "
              >
                {cat.replace("-", " ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
