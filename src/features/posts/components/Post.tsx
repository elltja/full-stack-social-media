import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { type Post } from "@prisma/client";

export default function Post({ data }: { data: Post }) {
  return (
    <div className="w-full h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
      <PostHeader />
      <p className="leading-6">{data.content}</p>
      <PostFooter />
    </div>
  );
}
