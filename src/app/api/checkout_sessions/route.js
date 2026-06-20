import { getArtworkDetails } from "@/lib/api/artworks";
import { getPlans } from "@/lib/api/plans";
import { getUserSession } from "@/lib/core/session";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getUserSession();
  const user = session?.user;

  try {
    const body = await req.json();
    const { artworkId, planId } = body;

    const origin = req.nextUrl.origin;

    // =========================
    // PLAN CHECKOUT (SUBSCRIPTION)
    // =========================
    if (planId) {
      console.log(planId)
      const planRes = await getPlans({ planId });
      const plan = planRes?.data || planRes;

      const STRIPE_PLANS = {
        'buyer-pro': "price_1TkEKuJIcN68seDXVbVx0JiL",
        'buyer-premium': "price_1TgMSxJIcN68seDXcNkqRsUH",
      };

      const priceId = STRIPE_PLANS[planId];

      if (!priceId) {
        return NextResponse.json(
          { error: "Stripe price not found for this plan" },
          { status: 400 },
        );
      }

      if (!plan) {
        return NextResponse.json({ error: "Plan not found" }, { status: 404 });
      }

      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer_email: user?.email,

        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        metadata: {
          type: "plan",
          planId: plan.planId,
          buyerId: user.id,
          buyerName: user.name
        },

        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
      });
      
      return NextResponse.json({
        url: stripeSession.url,
      });
    }

    // =========================
    // ARTWORK CHECKOUT (ONE TIME)
    // =========================
    if (artworkId) {
      const res = await getArtworkDetails(artworkId);
      const artwork = res?.data?.data;

      if (!artwork) {
        return NextResponse.json(
          { error: "Artwork not found" },
          { status: 404 },
        );
      }

      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: user?.email,

        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: artwork.name || artwork.title,
              },
              unit_amount: Math.round(Number(artwork.price) * 100),
            },
            quantity: 1,
          },
        ],

        metadata: {
          type: "artwork",
          artworkId: artwork._id.toString(),
          title: artwork.title,
          imageUrl: artwork.imageUrl,
          artistId: artwork.artistId,
          artistName: artwork.artistName,
          buyerId: user.id,
          buyerName: user?.name,
        },

        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/`,
      });

      return NextResponse.json({
        url: stripeSession.url,
      });
    }

    return NextResponse.json(
      { error: "artworkId or planId is required" },
      { status: 400 },
    );
  } catch (err) {
    console.error("Stripe checkout error:", err);

    return NextResponse.json(
      {
        error: err.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
