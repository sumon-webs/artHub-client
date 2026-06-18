"use client";

import React, { useState, useRef } from "react";
import {
  Button,
  Form,
  Input,
  TextArea,
  Select,
  Card,
  TextField,
  Label,
  ListBox,
} from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateArtwork } from "@/lib/actions/artworks";



export default function EditArtWorkForm({ artwork }) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());


    try {
      const file = fileInputRef.current?.files[0];
      let imageUrl = artwork?.imageUrl;

      if (file) {
        const imgData = new FormData();
        imgData.append("image", file);
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=d594d0c9bfdf17d819730deeb1b08f55`,
          {
            method: "POST",
            body: imgData,
          },
        );
        const result = await response.json();
        if (result.success) imageUrl = result.data.url;
      }

      const res = await updateArtwork(artwork._id, { ...data, imageUrl });
      console.log(res);
      if (res?.success) {
        toast.success("Artwork updated successfully!");
        router.push("/dashboard/artist/manage-artworks");
      } else {
        throw new Error(res?.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-lg mx-auto dark:bg-zinc-900">
      <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h2 className="text-xl font-bold">Edit Product</h2>

        <TextField defaultValue={artwork.title} isRequired name="title">
          <Label>Title</Label>
          <Input />
        </TextField>

        <TextField
          defaultValue={artwork.description}
          isRequired
          name="description"
        >
          <Label>Description</Label>
          <TextArea />
        </TextField>

        <TextField
          defaultValue={artwork.price}
          isRequired
          name="price"
          type="number"
        >
          <Label>Price</Label>
          <Input />
        </TextField>


        {/* Image Preview */}
        <div className="flex flex-col gap-2">
          <Label>Current Image</Label>
          <img
            src={artwork.imageUrl}
            alt="Artwork"
            className="w-32 h-32 object-cover rounded shadow-md"
          />
          <Label>Change Image (Optional)</Label>
          <input type="file" ref={fileInputRef} accept="image/*" />
        </div>

        <Button type="submit" isLoading={loading}>
          {loading?'Submiting...':'Submit'}
        </Button>
      </Form>
    </Card>
  );
}
