"use server";

import { authHeaders } from "../core/authHeaders";
import { fetchServer } from "../core/fetchServer";


export const getUsers = async ({
  role = "",
  search = "",
  userId = "",
} = {}) => {
  const header = await authHeaders()
  const params = new URLSearchParams();

  if (role) params.append("role", role);
  if (search) params.append("search", search);
  if (userId) params.append("userId", userId);

  const endpoint = `/api/users?${params.toString()}`;

  const res = await fetchServer({
    endpoint,
    headers:header
  });

  return res;
};