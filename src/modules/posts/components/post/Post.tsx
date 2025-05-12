import React from "react";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import { type Post } from "@prisma/client";
import { PostWithLikesSavesAndAuthor } from "@/lib/server/prisma";

export default function Post({ data }: { data: PostWithLikesSavesAndAuthor }) {
  return (
    <div className="w-[calc(100% - 40px)] h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
      <PostHeader
        author={data.author}
        createdAt={data.created_at}
        postId={data.id}
      />
      <p className="leading-6 break-all">{data.content}</p>
      <PostActions
        initialLikes={data.likes}
        initialSaves={data.saves}
        postId={data.id}
      />
    </div>
  );
}
