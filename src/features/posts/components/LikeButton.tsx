"use client";

import { Heart } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { likePost, unLikePost } from "../actions/actions";
import { useAuth } from "@/providers/AuthProvider";
import { SafeUser } from "@/lib/prisma";
import { Like } from "@prisma/client";

export default function LikeButton({
  postId,
  likes,
}: {
  postId: string;
  likes: Like[];
}) {
  const user = useAuth() as SafeUser;

  const [liked, setLiked] = useState<boolean>(
    !!likes.find((like) => like.user_id === user.id)
  );

  async function handleLike() {
    setLiked(true);
    await likePost(postId, user?.id);
    toast("Liked post", {
      description: new Date().toLocaleTimeString(),
      action: {
        label: "Undo",
        onClick: handleUnlike,
      },
    });
  }
  async function handleUnlike() {
    setLiked(false);
    await unLikePost(postId, user.id);
    toast("Unliked post", {
      description: new Date().toLocaleTimeString(),
      action: {
        label: "Undo",
        onClick: handleLike,
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
