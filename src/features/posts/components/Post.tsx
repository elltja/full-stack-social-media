import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { type Post } from "@prisma/client";
import { FullPost } from "@/lib/prisma";

export default function Post({ data }: { data: FullPost }) {
  return (
    <div className="w-[calc(100% - 40px)] h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
      <PostHeader author={data.author} data={data} />
      <p className="leading-6 break-all">{data.content}</p>
      <PostFooter data={data} />
    </div>
  );
}
