"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";
import { authHeaders } from "../core/authHeaders";

// CREATE COMMENT
export const createComment = async (data) => {
  const header = await authHeaders();
  const res = await serverMutation({
    endpoint: "/api/comments",
    method: "POST",
    body: data,
    headers: header,
  });

  if (res?.success) {
    revalidatePath("/artworks");
  }

  return res;
};

// DELETE COMMENT
export const deleteComment = async (id) => {
  const header = await authHeaders();
  if (!id) {
    return {
      success: false,
      message: "Comment id is required",
    };
  }

  const res = await serverMutation({
    endpoint: `/api/comments/${id}`,
    method: "DELETE",
    headers: header,
  });

  if (res?.data?.deletedCount > 0 || res?.success) {
    revalidatePath("/dashboard/buyer/coments");
  }

  return res;
};

export const updateComment = async ({ id, text, userId }) => {
  const header = await authHeaders()
  if (!id) {
    return {
      success: false,
      message: "Comment id is required",
    };
  }

  if (!text || !text.trim()) {
    return {
      success: false,
      message: "Comment text is required",
    };
  }

  const res = await serverMutation({
    endpoint: `/api/comments/${id}`,
    method: "PATCH",
    body: {
      text,
      userId, // optional but useful for ownership check
    },
    headers:header
  });

  if (res?.success) {
    revalidatePath("/dashboard/buyer/comments");
    revalidatePath("/artworks");
  }

  return res;
};
