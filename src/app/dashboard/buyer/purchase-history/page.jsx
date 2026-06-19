import BuyerSalesHistory from "@/components/dahsboard/buyer/BuyerSalesHistory";
import { getOrders } from "@/lib/api/orders";
import { getUserSession } from "@/lib/core/session";

const SalesHistoryPage = async () => {
  const session = await getUserSession();
  const buyerId = session?.user?.id;

  const res = await getOrders({ buyerId });
  const parchaseHistories = res?.data?.data || [];
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purcehase History</h1>
          <p className="text-default-500 mt-1">
            Track all your artwork purchases .
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-default-200 bg-content1 p-4">
            <p className="text-sm text-default-500">Total Purchase</p>
            <h2 className="text-2xl font-bold">{parchaseHistories.length}</h2>
          </div>

          <div className="rounded-xl border border-default-200 bg-content1 p-4">
            <p className="text-sm text-default-500">Total Revenue</p>
            <h2 className="text-2xl font-bold">
              $
              {parchaseHistories.reduce((sum, item) => sum + (item.price || 0), 0)}
            </h2>
          </div>

          <div className="rounded-xl border border-default-200 bg-content1 p-4">
            <p className="text-sm text-default-500">Paid Orders</p>
            <h2 className="text-2xl font-bold">
              {
                parchaseHistories.filter((item) => item.paymentStatus === "paid")
                  .length
              }
            </h2>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {parchaseHistories.length > 0 ? (
            <BuyerSalesHistory data={parchaseHistories} />
          ) : (
            <div className="text-center py-20 text-default-500">
              No sales found yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesHistoryPage;
