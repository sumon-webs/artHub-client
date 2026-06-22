"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Form, Input, TextField, Label } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();
  return data.data.url;
};

const EditProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [pending, setPending] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setPending(true);

      const formData = new FormData(e.target);
      const name = formData.get("name");
      const file = formData.get("image");

      let imageUrl = null;

      if (file && file.size > 0) {
        imageUrl = await uploadImage(file);
      }

      await authClient.updateUser({
        name,
        ...(imageUrl && { image: imageUrl }),
      });

      toast.success("Profile updated successfully!");
      router.push("/dashboard/buyer/profile");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setPending(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10
      bg-gradient-to-br from-slate-50 via-white to-slate-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
    "
    >
      <div className="w-full max-w-2xl">
        <div
          className="rounded-2xl sm:rounded-3xl border
          border-slate-200 dark:border-slate-800
          bg-white dark:bg-slate-900
          shadow-lg p-5 sm:p-8 md:p-10
        "
        >
          {/* HEADER */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              Edit Profile
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Update your profile information
            </p>
          </div>

          <Form
            onSubmit={handleUpdateProfile}
            className="space-y-5 sm:space-y-6"
          >
            {/* IMAGE */}
            <div className="flex flex-col gap-3">
              <Label>Profile Image</Label>

              {user?.image && (
                <img
                  src={user.image}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-slate-200 dark:border-slate-700"
                  alt="Profile"
                />
              )}

              <Input
                type="file"
                name="image"
                accept="image/*"
                className="w-full"
              />
            </div>

            {/* NAME */}
            <TextField defaultValue={user?.name || ""} isRequired>
              <Label>Full Name</Label>
              <Input name="name" placeholder="Enter your name" />
            </TextField>

            {/* EMAIL */}
            <Input
              readOnly
              isDisabled
              label="Email"
              defaultValue={user?.email || ""}
              className="w-full"
            />

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4">
              <Button
                variant="bordered"
                type="button"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                color="primary"
                isDisabled={pending}
                className="w-full sm:w-auto"
              >
                {pending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
