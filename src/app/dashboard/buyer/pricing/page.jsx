import BuyerPricingPage from "@/components/dahsboard/buyer/BuyerPricingPage";
import { getOrders } from "@/lib/api/orders";
import { getPlans } from "@/lib/api/plans";
import { getUserSession } from "@/lib/core/session";

const page = async () => {
  const session = await getUserSession();
  const user = session?.user;
  const buyerId = user?.id;
  const planObj = await getPlans();

  const orderRes = await getOrders(buyerId);
  return (
    <div>
      <BuyerPricingPage user={user} orderRes={orderRes} planObj={planObj}/>
    </div>
  );
};

export default page;
