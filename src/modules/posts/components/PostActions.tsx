"use client";

import React from "react";
import CommentIcon from "@/modules/posts/components/CommentIcon";
import ShareIcon from "@/modules/posts/components/ShareIcon";
import { Like, Save } from "@prisma/client";
import { Bookmark, Heart } from "lucide-react";
import useLike from "../hooks/useLike";
import useSave from "../hooks/useSave";

interface PostActionsProps {
  initialLikes: Like[];
  initialSaves: Save[];
  postId: string;
}

export default function PostActions({
  initialLikes,
  initialSaves,
  postId,
}: PostActionsProps) {
  const { liked, toggleLike } = useLike(postId, initialLikes);
  const { saved, toggleSave } = useSave(postId, initialSaves);
  return (
    <div className="flex w-full text-gray-400 items-center justify-between px-2">
      <div className="flex gap-3 *:cursor-pointer">
        <Heart
          onClick={toggleLike}
          fill={liked ? "red" : "transparent"}
          stroke={liked ? "red" : "currentColor"}
          strokeWidth={liked ? 0 : 1.5}
        />
        <CommentIcon postId={postId} />
        <ShareIcon postId={postId} />
      </div>
      <div className="flex gap-3 *:cursor-pointer">
        <Bookmark
          onClick={toggleSave}
          fill={saved ? "yello" : "transparent"}
          stroke={saved ? "yello" : "currentColor"}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
