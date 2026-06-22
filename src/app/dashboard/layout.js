"use client";

import Sidebar from "@/components/dahsboard/SideBar";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function ArtistDashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-default-50 dark:bg-background">
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>

        <h1 className="font-semibold">Dashboard</h1>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* sidebar */}
          <div className="relative w-72 bg-white dark:bg-zinc-900 h-full z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 p-4 pt-16 lg:pt-6 bg-default-50 dark:bg-background min-h-screen">
        {children}
      </main>
    </div>
  );
}
