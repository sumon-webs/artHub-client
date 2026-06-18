"use server";

const url = process.env.NEXT_PUBLIC_URL;

export const serverMutation = async ({
  endpoint,
  method = "POST",
  body = {},
  headers = {},
}) => {
  try {
    const res = await fetch(`${url}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Something went wrong");
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
