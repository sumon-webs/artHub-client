"use server";

import { fetchServer } from "../core/fetchServer";

export const getArtWorks = async (artistId = "") => {
  const endpoint = artistId
    ? `/api/artworks?artistId=${artistId}`
    : `/api/artworks`;

  const res = await fetchServer({
    endpoint,
  });

  return res;
};

export const getArtworkDetails = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "Artwork id is required",
    };
  }

  const res = await fetchServer({
    endpoint: "/api/artworks",
    id, // fetchServer auto /api/artworks/:id করবে
  });

  return res;
};
