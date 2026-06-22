import AddArtWorkForm from "@/components/dahsboard/artist/AddArtworkForm";

const AddArtWorkPage = () => {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-50 via-white to-slate-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        p-4 md:p-10
        transition-colors duration-300
      "
    >
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
            🎨 Add New Artwork
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
            Showcase your creativity by uploading your artwork details
          </p>
        </div>

        {/* FORM WRAPPER */}
        <div
          className="
            bg-white/80 dark:bg-slate-900/60
            backdrop-blur-xl
            rounded-3xl
            shadow-xl
            border border-slate-200/60 dark:border-slate-800
            p-5 md:p-10
          "
        >
          <AddArtWorkForm />
        </div>
      </div>
    </div>
  );
};

export default AddArtWorkPage;
