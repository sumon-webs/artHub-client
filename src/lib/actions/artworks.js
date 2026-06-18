"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/serverMutation";

export const postArtwork = async (data) => {
  const res = await serverMutation({
    endpoint: "/api/artworks",
    method: "POST",
    body: data,
  });

  return res;
};

export const updateArtwork = async (id, data) => {
  const res = await serverMutation({
    endpoint: `/api/artworks/${id}`,
    method: "PATCH",
    body: data,
  });

  return res;
};

export const deleteArtwork = async (id) => {
  const res = await serverMutation({
    endpoint: `/api/artworks/${id}`,
    method: "DELETE",
  });
  if (res.data.deletedCount > 0) {
    revalidatePath("/dashboard/artist/manage-artworks");
  }
  return res;
};
