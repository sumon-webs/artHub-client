"use client";

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  TextArea,
  Select,
  ListBox,
  Card,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { postArtwork } from "@/lib/actions/artworks";
import { useRouter } from "next/navigation";

export default function AddArtWorkForm() {
  const categories = [
    "painting",
    "drawing",
    "sketch",
    "digital-art",
    "illustration",
    "photography",
    "abstract",
    "modern-art",
    "minimalist",
    "3d-art",
    "mixed-media",
    "others",
  ];

  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("image");

    const imgData = new FormData();
    imgData.append("image", file);

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=d594d0c9bfdf17d819730deeb1b08f55`,
        {
          method: "POST",
          body: imgData,
        },
      );

      const result = await response.json();
      const imageUrl = result?.data?.url;

      const finalData = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        category: formData.get("category"),
        imageUrl,
        artistId: user?.id,
        artistName: user?.name,
      };

      const res = await postArtwork(finalData);

      if (!res.success) {
        toast.error(res?.message || "Failed to create artwork");
        return;
      }

      toast.success("Artwork created successfully 🎉");

      route.push("/dashboard/artist/manage-artworks");
    } catch (error) {
      console.log(error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="
        w-full
        max-w-2xl
        mx-auto
        p-4 md:p-8
        bg-white dark:bg-zinc-900
        border border-slate-200 dark:border-zinc-800
        rounded-2xl
        shadow-lg
      "
    >
      <Form onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">
          Add New Artwork
        </h2>

        {/* TITLE INPUT */}
        <TextField isRequired name="title">
          <Label>Title</Label>
          <Input placeholder="Enter artwork title" className="w-full" />
        </TextField>

        {/* DESCRIPTION */}
        <TextField isRequired name="description">
          <Label>Description</Label>
          <TextArea placeholder="Describe your artwork..." className="w-full" />
        </TextField>

        {/* PRICE */}
        <TextField isRequired name="price" type="number">
          <Label>Price</Label>
          <Input placeholder="0.00" className="w-full" />
        </TextField>

        {/* CATEGORY */}
        <TextField isRequired name="category">
          <Label>Category</Label>

          <Select>
            <Select.Trigger className="w-full">
              <Select.Value placeholder="Select category" />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                {categories.map((cat) => (
                  <ListBox.Item key={cat} id={cat}>
                    {cat}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </TextField>

        {/* IMAGE */}
        <div className="flex flex-col gap-1">
          <Label>Artwork Image</Label>

          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="
              w-full
              text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg
              file:border-0
              file:bg-indigo-500 file:text-white
              hover:file:bg-indigo-600
              dark:text-white
            "
          />
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          isDisabled={loading}
          className="w-full mt-2"
          color="primary"
        >
          {loading ? "Uploading..." : "Create Artwork"}
        </Button>
      </Form>
    </Card>
  );
}
