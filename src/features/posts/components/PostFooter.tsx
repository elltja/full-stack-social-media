import React from "react";
import LikeButton from "@/features/posts/components/LikeButton";
import CommentIcon from "@/components/CommentIcon";
import ShareIcon from "@/components/ShareIcon";
import SaveIcon from "@/features/posts/components/SaveIcon";
import { FullPost } from "@/lib/prisma";

export default function PostFooter({ data }: { data: FullPost }) {
  return (
    <div className="flex w-full text-gray-400 items-center justify-between px-2">
      <div className="flex gap-3 *:cursor-pointer">
        <LikeButton postId={data.id} likes={data.likes} />
        <CommentIcon postId={data.id} />
        <ShareIcon postId={data.id} />
      </div>
      <div className="flex gap-3 *:cursor-pointer">
        <SaveIcon postId={data.id} saves={data.saves} />
      </div>
    </div>
  );
}
