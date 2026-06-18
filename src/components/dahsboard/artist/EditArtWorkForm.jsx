"use client";

import React, { useState, useEffect } from "react";
import { Button, Form, Input, TextArea, Select, Card } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SelectItem } from "@heroui/select";
import { updateArtwork } from "@/lib/actions/artworks";

const categories = [
  "painting",
  "drawing",
  "sketch",
  "digital-art",
  "illustration",
  "photography",
  "abstract",
  "modern-art",
  "others",
];

export default function EditArtWorkForm({ artwork }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (artwork) {
      setFormData({
        title: artwork.title || "",
        description: artwork.description || "",
        price: artwork.price || "",
        category: artwork.category || "",
      });
    }
  }, [artwork]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const fileInput = e.currentTarget.querySelector('input[type="file"]');
    const file = fileInput?.files?.[0];

    let imageUrl = artwork?.imageUrl;

    try {
      setLoading(true);

      if (file) {
        const imgData = new FormData();
        imgData.append("image", file);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=d594d0c9bfdf17d819730deeb1b08f55`,
          { method: "POST", body: imgData },
        );

        const result = await response.json();
        imageUrl = result.data.url;
      }

      const finalData = {
        ...formData,
        imageUrl,
      };
console.log(finalData)
      const res = await updateArtwork(artwork._id, finalData);

      if (!res.success) throw new Error(res.message);

      toast.success("Artwork updated successfully!");
      router.push("/dashboard/artist/manage-artworks");

      if (!res.success) throw new Error(res.message);

      toast.success("Artwork updated successfully!");
      router.push("/dashboard/artist/manage-artworks");
    } catch (error) {
      toast.error(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-lg mx-auto dark:bg-zinc-900">
      <Form onSubmit={onSubmit} className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Edit Artwork</h2>

        <Input
          label="Title"
          value={formData.title}
          onValueChange={(val) => handleChange("title", val)}
          isRequired
        />

        <TextArea
          label="Description"
          value={formData.description}
          onValueChange={(val) => handleChange("description", val)}
          isRequired
        />

        <Input
          label="Price"
          type="number"
          value={String(formData.price)}
          onValueChange={(val) => handleChange("price", val)}
          isRequired
        />

        <Select
          label="Category"
          selectedKeys={
            formData.category ? new Set([formData.category]) : new Set()
          }
          onSelectionChange={(keys) => {
            const value = [...keys][0] || "";
            handleChange("category", value);
          }}
          isRequired
        >
          {categories.map((cat) => (
            <SelectItem key={cat}>{cat}</SelectItem>
          ))}
        </Select>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Product Image</label>

          {artwork?.imageUrl && (
            <img
              src={artwork.imageUrl}
              alt="preview"
              className="w-24 h-24 object-cover rounded"
            />
          )}

          <input type="file" name="image" accept="image/*" />
        </div>

        <Button type="submit" isLoading={loading}>
          Update
        </Button>
      </Form>
    </Card>
  );
}
