import BoughtArtworksTable from "@/components/dahsboard/buyer/BoughtArtWorkTable";
import { getOrders } from "@/lib/api/orders";
import { getUserSession } from "@/lib/core/session";

const BoughtArtsWorksPage = async () => {
  const session = await getUserSession();
  const buyerId = session?.user?.id;

  const res = await getOrders({ buyerId });
  const purchaseHistories = res?.data?.data || [];
  // console.log(purchaseHistories)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Purchased Artworks</h1>
        <p className="text-default-500">View all artworks you've purchased.</p>
      </div>

      <BoughtArtworksTable data={purchaseHistories} />
    </div>
  );
};

export default BoughtArtsWorksPage;
