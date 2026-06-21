"use server";

import { fetchServer } from "../core/fetchServer";


export const getDashboardStats = async () => {
  const endpoint = `/api/stats`;

  const res = await fetchServer({
    endpoint,
  });

  return res;
};
