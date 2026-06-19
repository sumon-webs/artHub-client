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
    <section className="w-full py-10 md:py-23 dark:bg-slate-950">
      <div className="mx-auto container px-4">
        {/* Title */}
        <h2 className=" text-center mb-6 text-2xl font-bold text-foreground">
          🎨 Browse Categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="
                cursor-pointer rounded-2xl border
                border-default-200 bg-content1
                p-4 text-center shadow-sm
                transition-all duration-200

                hover:-translate-y-1 hover:shadow-lg
                hover:border-primary/40
                hover:bg-default-100
              "
            >
              <p className="text-sm font-semibold capitalize text-foreground">
                {cat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
