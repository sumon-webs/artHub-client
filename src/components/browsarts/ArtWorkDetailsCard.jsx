"use client";

import { Card, Link, Button } from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CircleDollar } from "@gravity-ui/icons";
import { useState } from "react";
import { createComment } from "@/lib/actions/comment";

export function ArtworkDetailsCard({ artwork, user, limitReached }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const isLoggedIn = !!user;
  const isBuyer = user?.role === "buyer";

  // FINAL ACCESS RULE
  const canInteract = isLoggedIn && isBuyer && !limitReached;

  // BUY NOW
  const handleBuyNow = async () => {
    if (!canInteract) return;

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artworkId: artwork._id,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  // COMMENT
  const handleComment = async () => {
    if (!canInteract || !comment.trim()) return;

    try {
      const res = await createComment({
        artworkId: artwork._id,
        text: comment,
        userId: user?.id,
        userName: user?.name,
        userImage: user?.image || "",
      });

      if (res?.success) {
        setComments((prev) => [
          {
            _id: res?.insertedId,
            text: comment,
            userName: user?.name,
            createdAt: new Date(),
          },
          ...prev,
        ]);

        setComment("");
      }
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  if (!artwork) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-12"
    >
      {/* 🚨 LIMIT WARNING */}
      {limitReached && isBuyer && (
        <div className="mb-4 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700 font-medium space-y-3">
          <p>
            ⚠️ Your plan limit has been reached. You can still view artwork, but
            buying and commenting are disabled.
          </p>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/buyer/pricing">
              <Button color="warning">🚀 Upgrade Plan</Button>
            </Link>

            <span className="text-sm text-red-600">
              Upgrade to continue buying & commenting
            </span>
          </div>
        </div>
      )}

      <Card className="overflow-hidden p-0">
        {/* IMAGE */}
        <div className="relative w-full h-[400px]">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">{artwork.title}</h1>

          <p className="text-sm">
            By{" "}
            <Link
              href={`/artist/${artwork.artistId}`}
              className="text-primary font-medium"
            >
              {artwork.artistName}
            </Link>
          </p>

          <p>{artwork.description}</p>

          <div className="flex gap-4 items-center text-sm">
            <div className="flex items-center gap-1">
              <CircleDollar className="text-primary size-5" />
              <span>{artwork.price}</span>
            </div>

            <span className="px-2 py-1 rounded-full bg-default-100 text-xs">
              {artwork.category}
            </span>

            <span className="text-xs text-default-500">
              {new Date(artwork.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* 🛒 BUY BUTTON */}
          <div className="pt-4">
            <Button
              color="primary"
              disabled={!canInteract}
              onClick={handleBuyNow}
            >
              {!isLoggedIn
                ? "Login to Buy"
                : !isBuyer
                  ? "Only buyers can purchase"
                  : limitReached
                    ? "Plan limit reached"
                    : "Buy Now"}
            </Button>
          </div>
        </div>
      </Card>

      {/* 💬 COMMENT SECTION */}
      <div className="mt-8 bg-white dark:bg-slate-900 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>

        {!isLoggedIn ? (
          <p className="text-sm text-red-500 mb-4">Please login to comment</p>
        ) : !isBuyer ? (
          <p className="text-sm text-red-500 mb-4">Only buyers can comment</p>
        ) : limitReached ? (
          <p className="text-sm text-red-500 mb-4">
            Your plan limit has been reached. Upgrade to continue commenting.
          </p>
        ) : null}

        {/* INPUT */}
        <div className="flex flex-col gap-3">
          <textarea
            placeholder="Write your comment..."
            value={comment}
            disabled={!canInteract}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 rounded-md"
          />

          <Button
            onClick={handleComment}
            disabled={!canInteract}
            className="w-fit"
          >
            Post Comment
          </Button>
        </div>

        {/* LIST */}
        <div className="mt-6 space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-default-500">No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="p-3 rounded-lg bg-default-100 text-sm"
              >
                <p>{c.text}</p>
                <span className="text-xs text-default-500">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
