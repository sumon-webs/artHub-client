"use server";

const url = process.env.NEXT_PUBLIC_URL;

export const fetchServer = async ({
  endpoint,
  id,
  method = "GET",
  headers = {},
}) => {
  
  try {
    // যদি id থাকে তাহলে endpoint এর সাথে attach হবে
    const finalEndpoint = id ? `${endpoint}/${id}` : endpoint;

    const res = await fetch(`${url}${finalEndpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      }
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch data");
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
