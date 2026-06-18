"use client";

import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
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
    "others"
  ];
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const { data: session, ispending } = authClient.useSession();
  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("image");

    // 1. Upload Image to ImgBB
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
      const imageUrl = result.data.url;

      // 2. Prepare Final Data
      const finalData = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        category: formData.get("category"),
        imageUrl: imageUrl,
        artistId: user?.id,
      };

      const res = await postArtwork(finalData);
      if (!res.success) {
        toast.error(success.message);
        return;
      }

      toast.success("Product Created Successfully!");

      route.push("/dashboard/artist/manage-artworks");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-lg mx-auto dark:bg-zinc-900">
      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h2 className="text-xl font-bold">Add New Product</h2>

        <TextField isRequired name="title">
          <Label>Title</Label>
          <Input placeholder="Product name" />
        </TextField>

        <TextField isRequired name="description">
          <Label>Description</Label>
          <TextArea placeholder="Describe the item..." />
        </TextField>

        <TextField isRequired name="price" type="number">
          <Label>Price</Label>
          <Input placeholder="0.00" />
        </TextField>

        <Select name="category" isRequired>
          <Label>Category</Label>
          <Select.Trigger>
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

        <div className="flex flex-col gap-1">
          <Label>Product Image</Label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="text-sm"
          />
        </div>

        <Button type="submit">{loading ? "Submiting" : "Submit"}</Button>
      </Form>
    </Card>
  );
}
