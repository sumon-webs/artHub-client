"use client";

import { useState } from "react";
import { Card, Input, Button, Select, ListBox } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });

  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/onboarding",
    });
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const plan = form.role === "buyer" ? "buyer-free" : "artist-free";
    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        plan: plan,
      });
      console.log(error);
      if (error) {
        toast.error(error.message || "Signup failed!");
        return;
      }

      toast.success("Account created successfully 🎉");

      router.push("/");

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "buyer",
      });
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="
    w-full max-w-5xl
    flex flex-col lg:flex-row
    overflow-hidden
    shadow-2xl
    bg-white dark:bg-zinc-950
    border border-gray-200 dark:border-zinc-800
  "
    >
      {/* LEFT SIDE */}
      <div
        className="
    w-full lg:w-2/5
    bg-gradient-to-br
    from-purple-700 via-indigo-700 to-indigo-900
    text-white
    p-8 md:p-12
    flex flex-col
    justify-center
    items-center
    text-center
    gap-6
  "
      >
        <h2 className="text-3xl md:text-4xl font-bold">Welcome to ArtHub</h2>

        <p className="text-sm md:text-base opacity-90 max-w-sm">
          Join ArtHub to explore, buy, or sell original digital artworks.
        </p>

        <Link href="/signin" className="w-full max-w-xs">
          <Button
            color="default"
            variant="flat"
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            SIGN IN
          </Button>
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <form
        onSubmit={handleSubmit}
        className="
    w-full lg:w-3/5
    p-6 md:p-10 lg:p-12
    flex flex-col gap-4
  "
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-black dark:text-white">
          Create ArtHub Account
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md text-center">
            {error}
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="bg-green-100 text-green-600 text-sm p-2 rounded-md text-center">
            {success}
          </div>
        )}

        {/* Social Buttons */}
        <div className="flex gap-4 justify-center">
          {["G", "f", "in"].map((icon) => (
            <Button
              key={icon}
              isIconOnly
              variant="bordered"
              className="
        rounded-xl
        border-gray-300
        dark:border-zinc-700
      "
            >
              {icon}
            </Button>
          ))}
        </div>

        <p className="text-xs text-center text-gray-500">
          or register with your email
        </p>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <Input
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            isRequired
            variant="bordered"
          />

          <Input
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={handleChange}
            isRequired
            variant="bordered"
          />

          <Input
            name="password"
            label="Password"
            placeholder="Create password"
            type="password"
            value={form.password}
            onChange={handleChange}
            isRequired
            variant="bordered"
          />

          <Input
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            isRequired
            variant="bordered"
          />
        </div>

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              role: e.target.value,
            }))
          }
          className="w-full p-2 border rounded-md bg-transparent dark:bg-zinc-900 dark:border-zinc-700"
        >
          <option value="buyer">Buyer</option>
          <option value="artist">Artist</option>
        </select>
        {/* Submit */}
        <Button
          type="submit"
          color="primary"
          className="mt-4 w-full flex items-center justify-center gap-2"
          isDisabled={loading}
        >
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Signing up...
            </>
          ) : (
            "SIGN UP"
          )}
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
        <p className="text-center text-sm text-default-500">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </Card>
  );
}
