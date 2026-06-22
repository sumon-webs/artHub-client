"use server";


import { authHeaders } from "../core/authHeaders";
import { serverMutation } from "../core/serverMutation";

export const postArtwork = async (data) => {
  const header = await authHeaders()
  const res = await serverMutation({
    endpoint: "/api/artworks",
    method: "POST",
    body: data,
    headers:header
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
  const header = await authHeaders()
  const res = await serverMutation({
    endpoint: `/api/artworks/${id}`,
    method: "DELETE",
    headers:header
  });
  return res;
};
