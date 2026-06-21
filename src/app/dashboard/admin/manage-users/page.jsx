import { UsersTable } from "@/components/dahsboard/admin/UsersTable";
import { getUsers } from "@/lib/api/users";

const UserManagePage = async () => {
  const userRes = await getUsers();
  const users = userRes?.data?.data || [];

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            User Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all users, roles and permissions from here
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
          <UsersTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default UserManagePage;
