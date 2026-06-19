export default function Loader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-primary/20"></div>

        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-primary border-t-transparent">
          🎨
        </div>
      </div>

      <h3 className="mt-6 text-lg font-semibold">Discovering Artworks</h3>

      <p className="text-sm text-default-500">Curating your gallery...</p>
    </div>
  );
}
