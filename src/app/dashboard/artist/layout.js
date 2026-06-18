import { hasRole } from "@/lib/core/session";
import React from "react";

const ArtistDashboardLayout = async ({ children }) => {
  await hasRole("artist");
  return  children ;
};

export default ArtistDashboardLayout;
