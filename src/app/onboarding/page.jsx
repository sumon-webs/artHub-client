"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button, Card } from "@heroui/react";
import toast from "react-hot-toast";

export default function OnboardingPage() {
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await authClient.updateUser({
        role,
        plan: role === "buyer" ? "buyer-free" : "artist-free",
      });

      toast.success("Profile setup complete!");
      router.push("/");
    } catch (err) {
      toast.error("Failed to save role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950 transition-colors">
      <Card
        className="p-8 w-[420px] flex flex-col gap-5 
        bg-white dark:bg-zinc-900 
        border border-gray-200 dark:border-zinc-800
        shadow-lg dark:shadow-black/40
        rounded-2xl
      "
      >
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
          Choose your role
        </h2>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Select how you want to use ArtHub
        </p>

        {/* SELECT */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="
            w-full p-3 rounded-lg border
            bg-white dark:bg-zinc-800
            text-gray-900 dark:text-white
            border-gray-300 dark:border-zinc-700
            focus:outline-none focus:ring-2 focus:ring-purple-500
            transition
          "
        >
          <option value="buyer">Buyer</option>
          <option value="artist">Artist</option>
        </select>

        {/* INFO BOX */}
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg">
          {role === "buyer"
            ? "You can explore and purchase artworks."
            : "You can upload and sell your artworks."}
        </div>

        {/* BUTTON */}
        <Button
          onClick={handleSubmit}
          isLoading={loading}
          className="
            w-full bg-black text-white
            dark:bg-white dark:text-black
            hover:opacity-90 transition
          "
        >
          Continue
        </Button>
      </Card>
    </div>
  );
}
