import Sidebar from "@/components/dahsboard/SideBar";

export default function ArtistDashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 bg-default-50 dark:bg-background min-h-screen">
        {children}
      </main>
    </div>
  );
}
