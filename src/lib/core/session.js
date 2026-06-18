"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Current logged in user session
export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

// Check specific role
export const hasRole = async (role) => {
  const session = await getUserSession();
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }

  return true;
};
