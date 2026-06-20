import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import { getArtworkDetails } from "@/lib/api/artworks";
import { createOrder } from "@/lib/actions/Order";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import {
  checkPlanPurchase,
  createPlanPurchase,
} from "@/lib/actions/planPurchase";
import { getUserSession } from "@/lib/core/session";
import { updateUserPlan } from "@/lib/actions/user";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }
  const userSession = await getUserSession();
  const user = userSession?.user;

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const sessionType = session.metadata.type;

  if (session.status === "open") {
    redirect("/");
  }

  if (session.status === "complete") {
    if (sessionType === "artwork") {
      const artworkId = session.metadata.artworkId;
      const buyerId = session.metadata.buyerId;

      const artworkRes = await getArtworkDetails(artworkId);
      const artwork = artworkRes?.data?.data;
      console.log(artwork);
      await createOrder({
        artworkId: artwork._id,
        artWorkName: artwork.title,
        imageUrl: artwork.imageUrl,
        category: artwork.category,
        price: artwork.price,
        artistId: artwork.artistId,
        artistName: artwork.artistName,
        buyerId,
        buyerName: session.metadata.buyerName,
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

    if (sessionType === "plan") {
      const planId = session.metadata.planId;
      const buyerName = session.metadata.buyerName;
      const userId = session.metadata.buyerId;

      const check = await checkPlanPurchase(userId, planId);
      console.log(check);
      if (check?.exists) {
        // already purchased → stop / alert style page
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-red-500">
                Already Subscribed ⚠️
              </h1>

              <p className="text-default-500">
                You already have this plan active.
              </p>

              <Link
                href="/dashboard"
                className="bg-primary text-white px-6 py-3 rounded-xl"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        );
      }

      const data = {
        planId,
        buyerName,
        userId,
        payment_id: session.id,
        buyerEmail: session.customer_details?.email,
        paymentStatus: session.payment_status,
      };

      const res = await createPlanPurchase(data);

      const userRes = await updateUserPlan(userId, planId);

      return (
        <section className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-default-200 bg-content1 shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-10 text-center text-white">
              <CheckCircle className="mx-auto mb-4 h-20 w-20" />
              <h1 className="text-4xl font-bold">Subscription Activated 🎉</h1>
              <p className="mt-2 text-white/90">
                Welcome {buyerName || "back"}! Your plan is now active.
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="rounded-2xl bg-default-100 p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-default-500">Plan ID</span>
                  <span className="font-medium">{planId}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-default-500">Payment Status</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {session.payment_status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-default-500">Stripe Session</span>
                  <span className="font-mono text-xs">{session.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-default-500">Customer Email</span>
                  <span className="font-medium">
                    {session.customer_details?.email}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-default-200 p-4 text-center">
                <p className="text-default-500 text-sm">
                  Your subscription is now active. You can access all premium
                  features.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="flex-1 rounded-xl bg-primary px-6 py-3 text-center font-medium text-white transition hover:opacity-90"
                >
                  Go to Dashboard
                </Link>

                <Link
                  href="/browse-arts"
                  className="flex-1 rounded-xl border border-default-300 px-6 py-3 text-center font-medium transition hover:bg-default-100"
                >
                  Explore Artworks
                </Link>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

  return null;
}
