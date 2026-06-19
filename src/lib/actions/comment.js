"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

// CREATE COMMENT
export const createComment = async (data) => {
  const res = await serverMutation({
    endpoint: "/api/comments",
    method: "POST",
    body: data,
  });

  if (res?.success) {
    revalidatePath("/artworks");
  }

  return res;
};

// DELETE COMMENT
export const deleteComment = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "Comment id is required",
    };
  }

  const res = await serverMutation({
    endpoint: `/api/comments/${id}`,
    method: "DELETE",
  });

  if (res?.data?.deletedCount > 0 || res?.success) {
    revalidatePath("/artworks");
  }

  return res;
};
