"use client";

import { Card, Link, Button } from "@heroui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CircleDollar } from "@gravity-ui/icons";
import { useState } from "react";
import { createComment } from "@/lib/actions/comment";
import toast from "react-hot-toast";

export function ArtworkDetailsCard({ artwork, user, limitReached }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const isLoggedIn = !!user;
  const isBuyer = user?.role === "buyer";

  const canInteract = isLoggedIn && isBuyer && !limitReached;

  const handleBuyNow = async () => {
    if (!canInteract) return;

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId: artwork._id }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error(error);
    }
  };

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
      if(!res?.success){
        toast.error(res.message)
      }
      if (res?.success) {
        toast.success(res.message)
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
      console.error(error);
    }
  };

  if (!artwork) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-4 md:p-10 space-y-8"
    >
      {/* LIMIT WARNING */}
      {limitReached && isBuyer && (
        <div
          className="
            rounded-2xl
            border border-red-300 dark:border-red-800
            bg-red-50 dark:bg-red-900/20
            p-4 md:p-5
            text-red-700 dark:text-red-300
            space-y-3
          "
        >
          <p className="text-sm md:text-base">
            ⚠️ Your plan limit has been reached. Buying and commenting are
            disabled.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Link href="/dashboard/buyer/pricing">
              <Button color="warning" className="w-full sm:w-auto">
                🚀 Upgrade Plan
              </Button>
            </Link>

            <span className="text-xs md:text-sm text-red-600 dark:text-red-300">
              Upgrade to continue access
            </span>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <Card
        className="
          overflow-hidden
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl
        "
      >
        {/* IMAGE */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[420px]">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5 md:p-8 space-y-5">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            {artwork.title}
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            By{" "}
            <Link
              href={`/artist/${artwork.artistId}`}
              className="text-primary font-medium"
            >
              {artwork.artistName}
            </Link>
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {artwork.description}
          </p>

          {/* META */}
          <div className="flex flex-wrap gap-3 items-center text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1">
              <CircleDollar className="text-primary size-5" />
              <span>{artwork.price}</span>
            </div>

            <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs">
              {artwork.category}
            </span>

            <span className="text-xs text-slate-400">
              {new Date(artwork.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* BUY BUTTON */}
          <div className="pt-2">
            <Button
              color="primary"
              disabled={!canInteract}
              onClick={handleBuyNow}
              className="w-full sm:w-auto"
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

      {/* COMMENTS */}
      <div
        className="
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl
          p-5 md:p-8
        "
      >
        <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
          Comments
        </h2>

        {/* STATUS */}
        {!isLoggedIn ? (
          <p className="text-sm text-red-500 mb-4">Please login to comment</p>
        ) : !isBuyer ? (
          <p className="text-sm text-red-500 mb-4">Only buyers can comment</p>
        ) : limitReached ? (
          <p className="text-sm text-red-500 mb-4">
            Upgrade plan to continue commenting
          </p>
        ) : null}

        {/* INPUT */}
        <div className="flex flex-col gap-3">
          <textarea
            placeholder="Write your comment..."
            value={comment}
            disabled={!canInteract}
            onChange={(e) => setComment(e.target.value)}
            className="
              w-full
              min-h-[90px]
              p-3
              rounded-lg
              border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-950
              text-slate-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />

          <Button
            onClick={handleComment}
            disabled={!canInteract}
            className="w-full sm:w-auto"
          >
            Post Comment
          </Button>
        </div>

        {/* LIST */}
        <div className="mt-6 space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-slate-500">No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="
                  p-3
                  rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  text-sm
                "
              >
                <p className="text-slate-800 dark:text-slate-100">{c.text}</p>

                <span className="text-xs text-slate-500">
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
