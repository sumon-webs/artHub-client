import { hasRole } from "@/lib/core/session";
import React from "react";

const AdminDashboardLayout = async ({ children }) => {
  await hasRole("admin");
  return children;
};

export default AdminDashboardLayout;
