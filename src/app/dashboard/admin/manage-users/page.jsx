import { UsersTable } from "@/components/dahsboard/admin/UsersTable";
import { getUsers } from "@/lib/api/users";

const UserManagePage = async () => {
  const userRes = await getUsers();
  const users = userRes?.data?.data || [];

  return (
    <div
      className="
        min-h-screen
        px-4 py-6 md:px-8 md:py-10
        bg-gradient-to-br from-slate-50 via-white to-slate-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        transition-colors
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            User Management
          </h1>

          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
            Manage all users, roles and permissions from here
          </p>
        </div>

        {/* TABLE CARD */}
        <div
          className="
            bg-white/80 dark:bg-slate-900/60
            backdrop-blur-xl
            border border-slate-200 dark:border-slate-800
            rounded-2xl
            shadow-lg
            overflow-hidden
          "
        >
          <div className="p-4 md:p-6">
            <UsersTable users={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagePage;
