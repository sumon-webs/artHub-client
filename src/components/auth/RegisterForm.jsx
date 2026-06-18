"use client";

import { useState } from "react";
import { Card, Input, Button, Select, ListBox } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function SignupForm() {
  const [role, setRole] = useState("buyer");
  const [plan, setPlan] = useState("buyer-free");
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
      callbackURL: "/onboarding", // 👈 গুরুত্বপূর্ণ
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
    console.log(role);

    try {
      setLoading(true);
      {form.role === "buyer"?"buyer-free": 'artist-free'}
      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        plan: plan,
      });

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
    <Card className="w-[900px] flex flex-row shadow-lg overflow-hidden">
      {/* LEFT SIDE */}
      <div className="w-2/5 bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-8 flex flex-col justify-center items-center text-center gap-6">
        <h2 className="text-3xl font-bold">Welcome to ArtHub</h2>
        <p className="text-sm opacity-80">
          Join ArtHub to explore, buy, or sell original digital artworks.
        </p>

        <Link href={"/signin"}>
          <Button type="submit" color="primary" className="mt-4 w-full">
            SIGN IN
          </Button>
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <form onSubmit={handleSubmit} className="w-3/5 p-12 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">
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
            <Button key={icon} isIconOnly variant="flat" className="rounded-md">
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
          className="w-full p-2 border rounded-md"
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
      </form>
    </Card>
  );
}
