"use server";

import { fetchServer } from "../core/fetchServer";


export const getOrders = async ({
  artistId = "",
  userId = "",
  status = "",
} = {}) => {
  const params = new URLSearchParams();

  if (artistId) params.append("artistId", artistId);
  if (userId) params.append("userId", userId);
  if (status) params.append("status", status);

  const queryString = params.toString();

  const endpoint = queryString
    ? `/api/orders?${queryString}`
    : `/api/orders`;

  const res = await fetchServer({
    endpoint,
  });

  return res;
};