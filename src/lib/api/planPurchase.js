"use server";

import { authHeaders } from "../core/authHeaders";
import { fetchServer } from "../core/fetchServer";

export const getPlanPurchases = async ({
  buyerId = "",
  planId = "",
  status = "",
} = {}) => {
  const params = new URLSearchParams();
  const header = await authHeaders();

  if (buyerId) params.append("buyerId", buyerId);
  if (planId) params.append("planId", planId);
  if (status) params.append("status", status);

  const queryString = params.toString();

  const endpoint = queryString
    ? `/api/plan-purchases?${queryString}`
    : `/api/plan-purchases`;

  const res = await fetchServer({
    endpoint,
    headers:header
  });

  return res;
};

// 3. Get Single Purchase
export const getPlanPurchaseById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/plan-purchases/${id}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};
