"use server";

import { fetchServer } from "../core/fetchServer";


export const getTopArtists = async () => {
  const res = await fetchServer({
    endpoint: "/api/top-selling-artists",
  });

  return res;
};