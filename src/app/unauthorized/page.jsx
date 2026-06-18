import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <ShieldAlert className="h-20 w-20 text-danger" />
        </div>

        <h1 className="text-4xl font-bold">403</h1>

        <h2 className="mt-2 text-2xl font-semibold">
          Access Denied
        </h2>

        <p className="mt-3 text-default-500">
          You do not have permission to access this page.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-primary px-5 py-2 text-white"
          >
            Go Home
          </Link>

          <Link
            href="/signin"
            className="rounded-lg border px-5 py-2"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}