"use server";

import { authHeaders } from "../core/authHeaders";
import { fetchServer } from "../core/fetchServer";

export const getArtWorks = async ({
  artistId = "",
  category = "",
  search = "",
  sortByPrice = "",
  page = 1,
  limit = 9,
} = {}) => {
  const authHeader = await authHeaders();

  const params = new URLSearchParams();

  params.append("page", page);
  params.append("limit", limit);

  if (artistId) params.append("artistId", artistId);
  if (category && category !== "all") params.append("category", category);
  if (search) params.append("search", search);
  if (sortByPrice) params.append("sortByPrice", sortByPrice);

  const endpoint = `/api/artworks?${params.toString()}`;

  return await fetchServer({ endpoint, headers: authHeader });
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
    id,
  });

  return res;
};
