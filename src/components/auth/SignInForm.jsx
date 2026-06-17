"use client";

import { useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/onboarding", // 👈 গুরুত্বপূর্ণ
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials!");
        return;
      }

      toast.success("Login successful 🎉");

      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[900px] flex flex-row shadow-lg overflow-hidden">
      {/* LEFT SIDE */}
      <div className="w-2/4 bg-gradient-to-b from-indigo-700 to-purple-900 text-white p-8 flex flex-col justify-center items-center text-center gap-6">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-sm opacity-80">
          Login to continue exploring amazing artworks.
        </p>

        <Link href="/register">
          <Button
            variant="bordered"
            className="text-white border-white rounded-full w-32"
          >
            SIGN UP
          </Button>
        </Link>
      </div>

      {/* RIGHT SIDE FORM */}
      <form onSubmit={handleSubmit} className="w-2/3 p-12 flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center">Sign In to ArtHub</h2>

        {/* Social */}
        <div className="flex gap-4 justify-center">
          {["G", "f", "in"].map((icon) => (
            <Button key={icon} isIconOnly variant="flat" className="rounded-md">
              {icon}
            </Button>
          ))}
        </div>

        <p className="text-xs text-center text-gray-500">
          or login with your email
        </p>

        {/* Inputs */}
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          isRequired
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          isRequired
        />

        {/* Submit */}
        <Button
          type="submit"
          color="primary"
          className="w-full mt-3"
          isDisabled={loading}
        >
          {loading ? "Signing in..." : "SIGN IN"}
        </Button>
      <p className=" text-center">Or</p>
      <Button
        variant="bordered"
        onClick={googleSignIn}
        className="
    w-full flex items-center justify-center gap-2
    border-gray-300 text-gray-700 bg-white
    hover:bg-gray-100 hover:border-gray-400
    transition

    dark:bg-zinc-900
    dark:text-white
    dark:border-zinc-700
    dark:hover:bg-zinc-800
    dark:hover:border-zinc-600
  "
      >
        <span className="text-base">🌐</span>
        Continue with Google
      </Button>
      </form>
    </Card>
  );
}
