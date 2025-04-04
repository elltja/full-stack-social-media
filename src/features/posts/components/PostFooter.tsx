import React from "react";
import LikeButton from "@/components/LikeButton";
import CommentIcon from "@/components/CommentIcon";
import ShareIcon from "@/components/ShareIcon";
import SaveIcon from "@/components/SaveIcon";

export default function PostFooter() {
  return (
    <div className="flex w-full text-gray-400 items-center justify-between px-2">
      <div className="flex gap-3 *:cursor-pointer">
        <LikeButton />
        <CommentIcon />
        <ShareIcon />
      </div>
      <div className="flex gap-3 *:cursor-pointer">
        <SaveIcon />
      </div>
    </div>
  );
}
