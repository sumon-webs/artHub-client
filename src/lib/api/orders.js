"use server";

import { authHeaders } from "../core/authHeaders";
import { fetchServer } from "../core/fetchServer";

export const getOrders = async ({
  artistId = "",
  buyerId = "",
  status = "",
} = {}) => {
  const params = new URLSearchParams();
  const header = await authHeaders();

  if (artistId) params.append("artistId", artistId);
  if (buyerId) params.append("buyerId", buyerId);
  if (status) params.append("status", status);

  const queryString = params.toString();

  const endpoint = queryString ? `/api/orders?${queryString}` : `/api/orders`;

  const res = await fetchServer({
    endpoint,
    headers:header
  });

  return res;
};

export const getOrderDetails = async (orderId) => {
  const header = await authHeaders()
  if (!orderId) {
    throw new Error("orderId is required");
  }

  const endpoint = `/api/orders/${orderId}`;

  const res = await fetchServer({
    endpoint,
    headers:header
  });

  return res;
};
