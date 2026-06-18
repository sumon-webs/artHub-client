import { hasRole } from "@/lib/core/session";
import React from "react";

const BuyerDashboardLayout = async ({ children }) => {
  await hasRole("buyer");
  return children;
};

export default BuyerDashboardLayout;
