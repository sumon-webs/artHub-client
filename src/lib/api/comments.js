import { authHeaders } from "../core/authHeaders";
import { fetchServer } from "../core/fetchServer";

export const getCommentsByBuyerId = async ({
  artworkId = "",
  userId = "",
  status = "",
} = {}) => {
    
  const params = new URLSearchParams();

  const header = await authHeaders()

  if (artworkId) params.append("artworkId", artworkId);
  if (userId) params.append("userId", userId);
  if (status) params.append("status", status);

  const queryString = params.toString();

  const endpoint = queryString ? `/api/comments?${queryString}` : `/api/comments`;

  const res = await fetchServer({
    endpoint,
    headers:header
  });

  return res;
};