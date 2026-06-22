"use server";

import { authHeaders } from "../core/authHeaders";
import { fetchServer } from "../core/fetchServer";

export const getTopArtists = async ({
  artistId = "",
  search = "",
  sortBy = "",
} = {}) => {
  const header = await authHeaders()
  const params = new URLSearchParams();
  
  if (artistId) params.append("artistId", artistId);
  if (search) params.append("search", search);
  if (sortBy) params.append("sortBy", sortBy);

  const endpoint = `/api/top-selling-artists?${params.toString()}`;

  const res = await fetchServer({
    endpoint,
    headers:header
  });

  return res;
};
