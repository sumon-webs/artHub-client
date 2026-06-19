"use server";


import { serverMutation } from "../core/serverMutation";

export const createOrder = async (data) => {
  
  const res = await serverMutation({
    endpoint: "/api/orders",
    method: "POST",
    body: data,
  });


  return res;
};

