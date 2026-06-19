import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getArtworkDetails } from "@/lib/api/artworks";
import { getUserSession } from "@/lib/core/session";

export async function POST(req) {
  const session = await getUserSession();
  const user = session?.user;
  try {
    const body = await req.json();
    const { artworkId } = body;

    const origin = req.nextUrl.origin;

    const res = await getArtworkDetails(artworkId);
    const artwork = res?.data?.data;

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
    }

    if (!artwork?.price) {
      return NextResponse.json({ error: " price missing" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
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
      mode: "payment",
      customer_email: user?.email,
      metadata: {
        artworkId: artwork._id.toString(),
        title: artwork.title,
        imageUrl: artwork.imageUrl,
        artistId: artwork.artistId,
        artistName: artwork.artistName,
        buyerId: user.id,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
