"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/context/AuthContext";
import Image from "next/image";
import React, { useState, useRef } from "react";

export default function ProfilePictureUpload() {
  const user = useAuth();
  const [imageUrl, setImageUrl] = useState<string | null>(user.avatar_url);
  const pictureRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = () => {
    if (pictureRef.current?.files) {
      const file = pictureRef.current.files[0];
      if (file) {
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div>
      <Label htmlFor="profile-picture-input" className="h-30 w-30">
        <Image
          src={imageUrl || "/profile-placeholder.png"}
          alt="Profile picture"
          width={100}
          height={100}
          className="rounded-full cursor-pointer bg-gray-300 h-30 w-30 object-cover"
        />
      </Label>
      <Input
        ref={pictureRef}
        id="profile-picture-input"
        type="file"
        name="avatar"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
