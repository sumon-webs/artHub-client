import { Table } from "@heroui/react";

export default function AdminSubscriptionTable({ purchases = [] }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Subscription Purchases"
          className="min-w-[900px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>Buyer</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Plan</Table.Column>
            <Table.Column>Payment Status</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Purchased At</Table.Column>
          </Table.Header>

          <Table.Body>
            {purchases.map((purchase) => (
              <Table.Row key={purchase._id}>
                <Table.Cell>{purchase.buyerName}</Table.Cell>

                <Table.Cell>{purchase.buyerEmail}</Table.Cell>

                <Table.Cell className="uppercase">
                  {purchase.planId}
                </Table.Cell>

                <Table.Cell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      purchase.paymentStatus === "paid"
                        ? "bg-success/15 text-success"
                        : "bg-danger/15 text-danger"
                    }`}
                  >
                    {purchase.paymentStatus}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      purchase.status === "active"
                        ? "bg-primary/15 text-primary"
                        : "bg-warning/15 text-warning"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}