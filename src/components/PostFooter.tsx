import React from "react";
import LikeIcon from "./LikeIcon";
import CommentIcon from "./CommentIcon";
import ShareIcon from "./ShareIcon";
import SaveIcon from "./SaveIcon";

export default function PostFooter() {
  return (
    <div className="flex w-full text-gray-400 items-center justify-between px-2">
      <div className="flex gap-3 *:cursor-pointer">
        <LikeIcon />
        <CommentIcon />
        <ShareIcon />
      </div>
      <div className="flex gap-3 *:cursor-pointer">
        <SaveIcon />
      </div>
    </div>
  );
}
