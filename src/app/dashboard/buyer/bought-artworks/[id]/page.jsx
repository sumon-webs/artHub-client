import { getOrderDetails } from "@/lib/api/orders";
import { ChartLinePoints } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { DivideCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await getOrderDetails(id);
  const order = res?.data?.data;

  if (!order) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Order not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={order.imageUrl}
          alt={order.artWorkName}
          width={400}
          height={300}
          className="rounded-xl object-cover w-full md:w-[400px] h-[300px]"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{order.artWorkName}</h1>

          <p className="text-default-500 capitalize">
            Category: {order.category?.replace("-", " ")}
          </p>

          <p className="text-lg font-semibold">Price: ${order.price}</p>

          <ChartLinePoints
            color={order.paymentStatus === "paid" ? "success" : "warning"}
            variant="flat"
          >
            {order.paymentStatus}
          </ChartLinePoints>

          <div className="pt-2">
            <Link href={`/browse-arts/${order.artworkId}`}>
              <Button>View Artwork</Button>
            </Link>
          </div>
        </div>
      </div>

      <DivideCircle />

      {/* Info Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-xl p-5 space-y-3">
          <h2 className="text-xl font-semibold">Artist Info</h2>
          <p>
            <span className="font-medium">Name:</span> {order.artistName}
          </p>
          <p>
            <span className="font-medium">Artist ID:</span> {order.artistId}
          </p>
        </div>

        <div className="border rounded-xl p-5 space-y-3">
          <h2 className="text-xl font-semibold">Buyer Info</h2>
          <p>
            <span className="font-medium">Name:</span> {order.buyerName}
          </p>
          <p>
            <span className="font-medium">Buyer ID:</span> {order.buyerId}
          </p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="border rounded-xl p-5 space-y-2">
        <h2 className="text-xl font-semibold">Payment Info</h2>

        <p>
          <span className="font-medium">Stripe Session:</span>{" "}
          <span className="break-all text-sm">{order.stripeSessionId}</span>
        </p>

        <p>
          <span className="font-medium">Purchased At:</span>{" "}
          {new Date(order.purchasedAt).toLocaleString()}
        </p>

        <p>
          <span className="font-medium">Created At:</span>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
