"use client";

import { useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const googleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/onboarding",
      });
    } catch (error) {
      toast.error("Google Sign In Failed");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials!");
        return;
      }

      toast.success("Login successful 🎉");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="
        w-full max-w-5xl
        flex flex-col md:flex-row
        overflow-hidden
        shadow-xl
      "
    >
      {/* LEFT SIDE */}
      <div
        className="
          w-full md:w-2/5
          bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-900
          text-white
          p-10
          flex flex-col justify-center items-center
          text-center gap-5
        "
      >
        <h2 className="text-3xl font-bold">Welcome Back 👋</h2>

        <p className="text-sm opacity-90 max-w-xs">
          Login to continue exploring amazing artworks and connect with talented
          artists around the world.
        </p>

        <Link href="/register">
          <Button
            variant="bordered"
            className="border-white text-white rounded-full px-8"
          >
            SIGN UP
          </Button>
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <form
        onSubmit={handleSubmit}
        className="
          w-full md:w-3/5
          p-8 md:p-12
          flex flex-col gap-5
          bg-white dark:bg-zinc-950
        "
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Sign In</h2>

          <p className="text-sm text-default-500 mt-2">
            Sign in to your ArtHub account
          </p>
        </div>

        {/* Inputs */}
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          isRequired
          variant="bordered"
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          isRequired
          variant="bordered"
        />


        {/* Login Button */}
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="font-semibold"
          isDisabled={loading}
        >
          {loading ? "Signing In..." : "SIGN IN"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t"></div>
          <span className="text-sm text-default-500">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Google Sign In */}
        <Button
          variant="bordered"
          onClick={googleSignIn}
          startContent={<FcGoogle size={22} />}
          className="
            w-full
            font-medium
            dark:border-zinc-700
            dark:hover:bg-zinc-900
          "
        >
          Continue with Google
        </Button>

        {/* Register */}
        <p className="text-center text-sm text-default-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Card>
  );
}
