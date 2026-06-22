import { getOrderDetails } from "@/lib/api/orders";
import { ChartLinePoints } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { DivideCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderDetailsPage = async ({ params }) => {
  const { id } =await params;

  const res = await getOrderDetails(id);
  const order = res?.data?.data;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-10">
        <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300">
          Order not found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        px-4 py-6 md:px-8 md:py-10
        bg-gradient-to-br from-slate-50 via-white to-slate-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        space-y-10
      "
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <div
          className="
            flex flex-col md:flex-row gap-6
            bg-white/70 dark:bg-slate-900/60
            backdrop-blur-xl
            border border-slate-200 dark:border-slate-800
            rounded-2xl
            p-5 md:p-8
          "
        >
          {/* IMAGE */}
          <Image
            src={order.imageUrl}
            alt={order.artWorkName}
            width={400}
            height={300}
            className="
              rounded-xl
              object-cover
              w-full md:w-[400px]
              h-[250px] md:h-[300px]
            "
          />

          {/* INFO */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              {order.artWorkName}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 capitalize">
              Category: {order.category?.replace("-", " ")}
            </p>

            <p className="text-lg font-semibold text-slate-800 dark:text-white">
              Price: ${order.price}
            </p>

            <div className="flex items-center gap-2">
              <ChartLinePoints
                color={order.paymentStatus === "paid" ? "success" : "warning"}
              />
              <span className="text-sm capitalize">{order.paymentStatus}</span>
            </div>

            <Link href={`/browse-arts/${order.artworkId}`}>
              <Button color="primary" className="mt-2">
                View Artwork
              </Button>
            </Link>
          </div>
        </div>

        <DivideCircle />

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Artist Info
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Name:</span> {order.artistName}
            </p>

            <p className="text-xs text-slate-500 break-all">
              <span className="font-medium">Artist ID:</span> {order.artistId}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 space-y-3">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Buyer Info
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Name:</span> {order.buyerName}
            </p>

            <p className="text-xs text-slate-500 break-all">
              <span className="font-medium">Buyer ID:</span> {order.buyerId}
            </p>
          </div>
        </div>

        {/* PAYMENT INFO */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Payment Info
          </h2>

          <p className="text-sm break-all text-slate-600 dark:text-slate-300">
            <span className="font-medium">Stripe Session:</span>{" "}
            {order.stripeSessionId}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium">Purchased At:</span>{" "}
            {new Date(order.purchasedAt).toLocaleString()}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium">Created At:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
