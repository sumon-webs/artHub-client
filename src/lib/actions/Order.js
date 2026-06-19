"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const createOrder = async (data) => {
  
  const res = await serverMutation({
    endpoint: "/api/orders",
    method: "POST",
    body: data,
  });


  return res;
};

export const updateOrder = async (id, data) => {
  const res = await serverMutation({
    endpoint: `/api/orders/${id}`,
    method: "PATCH",
    body: data,
  });

  return res;
};

export const deleteOrder = async (id) => {
  const res = await serverMutation({
    endpoint: `/api/orders/${id}`,
    method: "DELETE",
  });

  if (res?.data?.deletedCount > 0) {
    revalidatePath("/dashboard/orders");
  }

  return res;
};
