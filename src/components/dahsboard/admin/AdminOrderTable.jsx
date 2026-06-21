
import { Table } from "@heroui/react";

export default function AdminOrdersTable({ orders = [] }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Orders Table"
          className="min-w-[900px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>Artwork</Table.Column>
            <Table.Column>Artist</Table.Column>
            <Table.Column>Buyer</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Purchased At</Table.Column>
          </Table.Header>

          <Table.Body>
            {orders.map((order) => (
              <Table.Row key={order._id}>
                <Table.Cell>{order.artWorkName}</Table.Cell>
                <Table.Cell>{order.artistName}</Table.Cell>
                <Table.Cell>{order.buyerName}</Table.Cell>
                <Table.Cell>${order.price}</Table.Cell>
                <Table.Cell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      order.paymentStatus === "paid"
                        ? "bg-success/15 text-success"
                        : "bg-danger/15 text-danger"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  {new Date(order.purchasedAt).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}