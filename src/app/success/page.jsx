import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import { getArtworkDetails } from "@/lib/api/artworks";
import { createOrder } from "@/lib/actions/Order";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.status === "open") {
    redirect("/");
  }

  if (session.status === "complete") {
    const artworkId = session.metadata.artworkId;
    const buyerId = session.metadata.buyerId;

    const artworkRes = await getArtworkDetails(artworkId);
    const artwork = artworkRes?.data?.data;
    await createOrder({
      artworkId: artwork._id,
      artWorkName: artwork.title,
      imageUrl: artwork.imageUrl,
      category: artwork.category,
      price: artwork.price,
      artistId: artwork.artistId,
      artistName: artwork.artistName,
      buyerId,
      buyerName:session.metadata.buyerName,
      stripeSessionId: session.id,
      paymentStatus: session.payment_status,
      purchasedAt: new Date(),
    });

    return (
      <section className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-default-200 bg-content1 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-10 text-center text-white">
            <CheckCircle className="mx-auto mb-4 h-20 w-20" />
            <h1 className="text-4xl font-bold">Payment Successful 🎉</h1>
            <p className="mt-2 text-white/90">
              Thank you for purchasing artwork from Arts Hub
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Artwork Image */}
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Artwork Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{artwork.title}</h2>

                <p className="text-default-500">
                  Purchased successfully and added to your collection.
                </p>

                <div className="space-y-3 rounded-2xl bg-default-100 p-5">
                  <div className="flex justify-between">
                    <span className="text-default-500">Artist</span>
                    <span className="font-medium">{artwork.artistName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-default-500">Category</span>
                    <span className="font-medium capitalize">
                      {artwork.category}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-default-500">Price</span>
                    <span className="font-bold text-green-500">
                      ${artwork.price}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-default-500">Status</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {session.payment_status}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-default-200 p-4">
                  <p className="text-sm text-default-500">
                    Confirmation email sent to
                  </p>
                  <p className="font-medium">
                    {session.customer_details?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard/my-orders"
                className="flex-1 rounded-xl bg-primary px-6 py-3 text-center font-medium text-white transition hover:opacity-90"
              >
                View My Orders
              </Link>

              <Link
                href="/browse-arts"
                className="flex-1 rounded-xl border border-default-300 px-6 py-3 text-center font-medium transition hover:bg-default-100"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
