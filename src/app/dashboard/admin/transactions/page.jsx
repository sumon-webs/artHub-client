import { Card } from "@heroui/react";
import { getOrders } from "@/lib/api/orders";
import { getPlanPurchases } from "@/lib/api/planPurchase";
import AdminSubscriptionTable from "@/components/dahsboard/admin/AdminSubscriptionTable";
import AdminOrdersTable from "@/components/dahsboard/admin/AdminOrderTable";

const AdminTransactionsPage = async () => {
  const orderRes = await getOrders();
  const orders = orderRes?.data?.data || [];

  const planPurchaseRes = await getPlanPurchases();
  const planPurchases = planPurchaseRes?.data?.data || [];

  const totalOrders = orders.length;
  const totalSubscriptions = planPurchases.length;

  const artworksSold = orders.reduce(
    (sum, order) => sum + (order.quantity || 1),
    0,
  );

  const orderRevenue = orders.reduce(
    (sum, order) => sum + Number(order.amount || order.price || 0),
    0,
  );

  const subscriptionRevenue = planPurchases.reduce(
    (sum, purchase) => sum + Number(purchase.amount || purchase.price || 0),
    0,
  );

  const totalRevenue = orderRevenue + subscriptionRevenue;

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Transactions Overview</h1>
        <p className="text-default-500 mt-1">
          Monitor orders, subscriptions and revenue.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card variant="secondary">
          <Card.Header>
            <Card.Title>Total Orders</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </Card.Content>
        </Card>

        <Card variant="secondary">
          <Card.Header>
            <Card.Title>Total Subscriptions</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-bold">{totalSubscriptions}</p>
          </Card.Content>
        </Card>

        <Card variant="secondary">
          <Card.Header>
            <Card.Title>Artworks Sold</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-bold">{artworksSold}</p>
          </Card.Content>
        </Card>

        <Card variant="secondary">
          <Card.Header>
            <Card.Title>Total Revenue</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          </Card.Content>
        </Card>
      </div>

      {/* Orders Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Orders</h2>
          <p className="text-default-500">All artwork purchase transactions.</p>
        </div>

        <Card variant="default">
          <Card.Content className="p-6">
            <AdminOrdersTable orders={orders} />
          </Card.Content>
        </Card>
      </section>

      {/* Subscription Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Subscriptions</h2>
          <p className="text-default-500">
            All premium plan purchase transactions.
          </p>
        </div>

        <Card variant="default">
          <Card.Content className="p-6">
            <AdminSubscriptionTable purchases={planPurchases} />
          </Card.Content>
        </Card>
      </section>
    </div>
  );
};

export default AdminTransactionsPage;
