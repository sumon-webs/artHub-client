import AdminArtworksTable from "@/components/dahsboard/admin/AdminArtWorksTable";
import { getArtWorks } from "@/lib/api/artworks";

const DashboardManageArtWorks = async () => {
  const artsRes = await getArtWorks();
  const artWorks = artsRes?.data?.data || [];
  
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Manage Artworks</h1>
        <p className="text-default-500">
          View and manage all artworks uploaded by artists.
        </p>
      </div>

      {/* Stats Card */}
      <div className="rounded-xl border bg-content1 p-5 shadow-sm">
        <h3 className="text-sm text-default-500">Total Artworks</h3>
        <p className="mt-1 text-3xl font-bold">{artWorks.length}</p>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border bg-content1 p-4 shadow-sm">
        <AdminArtworksTable artworks={artWorks} />
      </div>
    </div>
  );
};

export default DashboardManageArtWorks;
