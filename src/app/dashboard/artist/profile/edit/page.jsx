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
    const router = useRouter()
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

      router.push('/dashboard/artist/profile')

    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setPending(false);
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-default-200 bg-content1 p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="mt-2 text-default-500">
            Update your profile information
          </p>

          <Form onSubmit={handleUpdateProfile} className="space-y-6 mt-6">
            {/* Image Preview */}
            <div className="flex flex-col gap-2">
              <Label>Current Profile Image</Label>
              {user?.image && (
                <img
                  src={user.image}
                  className="w-20 h-20 rounded-full"
                  alt="Profile"
                />
              )}
              <Input
                type="file"
                name="image"
                accept="image/*"
                label="Change Profile Image"
              />
            </div>

            {/* Name */}
            <TextField defaultValue={user?.name || ""} isRequired>
              <Label>Full Name</Label>
              <Input name="name" placeholder="Enter your name" />
            </TextField>

            {/* Email */}
            <Input
              readOnly
              label="Email"
              isDisabled
              defaultValue={user?.email || ""}
            />

            <div className="flex justify-end gap-3">
              <Button variant="bordered" type="button">
                Cancel
              </Button>
              <Button type="submit" color="primary" isLoading={pending}>
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
