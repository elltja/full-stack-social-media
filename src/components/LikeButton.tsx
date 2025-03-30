"use client";

import { Heart } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  function handleLike() {
    setLiked(true);
    toast("Liked post", {
      description: new Date().toLocaleTimeString(),
      action: {
        label: "Undo",
        onClick: () => setLiked(false),
      },
    });
  }
  function handleUnlike() {
    setLiked(false);
    toast("Unliked post", {
      description: new Date().toLocaleTimeString(),
      action: {
        label: "Undo",
        onClick: () => setLiked(true),
      },
    });
  }
  return (
    <Heart
      onClick={liked ? handleUnlike : handleLike}
      fill={liked ? "red" : "transparent"}
      stroke={liked ? "red" : "currentColor"}
      strokeWidth={liked ? 0 : 1.5}
    />
  );
}
