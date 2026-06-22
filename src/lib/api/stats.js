"use server";

import { authHeaders } from "../core/authHeaders";
import { fetchServer } from "../core/fetchServer";


export const getDashboardStats = async () => {
  const header = await authHeaders()
  const endpoint = `/api/stats`;

  const res = await fetchServer({
    endpoint,
    headers:header
  });

  return res;
};
