export const getPlanPurchases = async (query = {}) => {
  const params = new URLSearchParams(query).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/plan-purchases?${params}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

// 3. Get Single Purchase
export const getPlanPurchaseById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/plan-purchases/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};