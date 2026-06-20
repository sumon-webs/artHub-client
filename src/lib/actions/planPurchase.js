"use server";

import { serverMutation } from "../core/serverMutation";

// 1. Create Plan Purchase
export const createPlanPurchase = async (data) => {
  const res = await serverMutation({
    endpoint: "/api/plan-purchases",
    method: "POST",
    body: data,
  });

  return res;
};

export const checkPlanPurchase = async (userId, planId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/plan-purchases/check?userId=${userId}&planId=${planId}`,
    { cache: "no-store" },
  );

  return res.json();
};
