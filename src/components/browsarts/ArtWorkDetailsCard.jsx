"use client";

import { Card, Link, Button } from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CircleDollar } from "@gravity-ui/icons";
import { useState } from "react";

export function ArtworkDetailsCard({ artwork, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  
  const isLoggedIn = !!user;
  const isBuyer = user?.role === "buyer";

  const canInteract = isLoggedIn && isBuyer;

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
    if (!comment.trim() || !canInteract) return;

    const newComment = {
      artworkId: artwork._id,
      text: comment,
      userId: user?.id,
      createdAt: new Date(),
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  if (!artwork) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-12"
    >
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
          <form action="/api/checkout_sessions" method="POST">
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
                    : "Buy Now"}
              </Button>
            </div>
          </form>
        </div>
      </Card>

      {/* 💬 COMMENT SECTION */}
      <div className="mt-8 bg-white dark:bg-slate-900 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Comments</h2>

        {!isLoggedIn ? (
          <p className="text-sm text-red-500 mb-4">Please login to comment</p>
        ) : !isBuyer ? (
          <p className="text-sm text-red-500 mb-4">Only buyers can comment</p>
        ) : null}

        {/* input */}
        <div className="flex flex-col gap-3">
          <textarea
            placeholder="Write your comment..."
            value={comment}
            disabled={!canInteract}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button
            onClick={handleComment}
            disabled={!canInteract}
            className="w-fit"
          >
            Post Comment
          </Button>
        </div>

        {/* list */}
        <div className="mt-6 space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-default-500">No comments yet.</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="p-3 rounded-lg bg-default-100 text-sm">
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
