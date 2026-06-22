import { getUserToken } from "./session";

export const authHeaders = async () => {
  const token = await getUserToken();

  return token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
};
