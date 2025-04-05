import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { type Post } from "@prisma/client";
import { PostWithUser } from "@/lib/prisma";

export default function Post({ data }: { data: PostWithUser }) {
  return (
    <div className="w-full h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
      <PostHeader user={data.author} createdAt={data.created_at} />
      <p className="leading-6">{data.content}</p>
      <PostFooter />
    </div>
  );
}
