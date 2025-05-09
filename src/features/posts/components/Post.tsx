import React from "react";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import { type Post } from "@prisma/client";
import { FullPost } from "@/lib/server/prisma";

export default function Post({ data }: { data: FullPost }) {
  return (
    <div className="w-[calc(100% - 40px)] h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
      <PostHeader author={data.author} data={data} />
      <p className="leading-6 break-all">{data.content}</p>
      <PostActions
        initialLikes={data.likes}
        initialSaves={data.saves}
        postId={data.id}
      />
    </div>
  );
}
