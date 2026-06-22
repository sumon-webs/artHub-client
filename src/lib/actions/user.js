"use server";

import { authHeaders } from "../core/authHeaders";
import { serverMutation } from "../core/serverMutation";

export const updateUserRole = async (userId, role) => {
  const header = await authHeaders();
  
  const res = await serverMutation({
    endpoint: `/api/users/${userId}/role`,
    method: "PATCH",
    body: { role },
    headers: header,
  });

  return res;
};
