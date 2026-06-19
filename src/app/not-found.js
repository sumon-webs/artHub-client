import Link from "next/link";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-default-900">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-default-500 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6 flex gap-3">
        <Button as={Link} href="/" color="primary">
          Go Home
        </Button>

        <Button
          as={Link}
          href="/bought-artworks"
          variant="flat"
        >
          My Purchases
        </Button>
      </div>
    </div>
  );
}