"use client";

import React, { useState } from "react";
import ProfilePicture from "@/modules/user/components/ProfilePicture";
import { LoaderCircle, MapPin, Upload } from "lucide-react";
import ImageUploader from "@/modules/post/components/composer/ImageUploader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import ImageList from "./ImageList";
import { useRouter } from "next/navigation";

export default function PostComposer() {
  const [images, setImages] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuth();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    Array.from(formData.getAll("images")).forEach(() => {
      formData.delete("images");
    });

    images.forEach((file) => {
      formData.append("images", file);
    });
    setIsPending(true);

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setImages([]);
        form.reset();
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong!");
      }
    } catch {
      setError("An error occurred while submitting your post.");
    } finally {
      setIsPending(false);
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="w-full h-fit bg-white rounded-md shadow flex flex-col p-5 gap-5"
    >
      <div className="w-full flex gap-3 items-start">
        <div className="h-fit w-fit my-1">
          <ProfilePicture
            src={user?.avatar_url ?? ""}
            name={user?.name || ""}
            username={user.account_name}
          />
        </div>
        <div className="flex flex-col w-full">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 h-fit field-sizing-content max-h-96 py-2 px-4 outline-none bg-gray-100 rounded-lg resize-none"
            name="text"
          />
          {error && <p className="text-destructive">{error}</p>}
        </div>
      </div>

      <ImageList
        onImageDeletion={(imageUrl) =>
          setImages((prev) => prev.filter((file) => file !== imageUrl))
        }
        images={images}
      />

      <div className="flex justify-between items-center">
        <div className="flex gap-3 text-gray-400 *:cursor-pointer">
          <ImageUploader
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              setImages((prev) => [...prev, ...files]);
            }}
          />
          <Upload />
          <MapPin />
        </div>
        <Button className="cursor-pointer w-[5em]">
          {isPending ? <LoaderCircle className="animate-spin" /> : "Post"}
        </Button>
      </div>
    </form>
  );
}
