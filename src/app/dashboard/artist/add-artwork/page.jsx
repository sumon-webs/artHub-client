import AddArtWorkForm from "@/components/dahsboard/artist/AddArtworkForm";

const AddArtWorkPage = () => {
  return (
    // Added 'dark:from-slate-900' and 'dark:to-slate-950' for background
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            🎨 Add New Artwork
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Showcase your creativity by uploading your artwork details
          </p>
        </div>

        {/* Form Card */}
        {/* Added dark:bg-slate-800 and dark:border-slate-700 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100 dark:border-slate-700">
          <AddArtWorkForm />
        </div>
      </div>
    </div>
  );
};

export default AddArtWorkPage;
