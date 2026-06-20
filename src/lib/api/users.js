"use server";

import { fetchServer } from "../core/fetchServer";


export const getUsers = async ({
  role = "",
  search = "",
  userId = "",
} = {}) => {
  const params = new URLSearchParams();

  if (role) params.append("role", role);
  if (search) params.append("search", search);
  if (userId) params.append("userId", userId);

  const endpoint = `/api/users?${params.toString()}`;

  const res = await fetchServer({
    endpoint,
  });

  return res;
};