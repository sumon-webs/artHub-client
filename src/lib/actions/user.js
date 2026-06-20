"use server";

import { serverMutation } from "../core/serverMutation";


export const updateUserPlan = async (userId, planId) => {
  const res = await serverMutation({
    endpoint: `/api/users/${userId}/plan`,
    method: "PATCH",
    body: { planId },
  });

  return res;
};