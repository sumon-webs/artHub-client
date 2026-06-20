"use server";

import { fetchServer } from "../core/fetchServer";


export const getPlans = async ({ planId = "" } = {}) => {
  const params = new URLSearchParams();
  if (planId) params.append("planId", planId);

  const endpoint = `/api/plans?${params.toString()}`;

  const res = await fetchServer({
    endpoint,
  });

  return res;
};