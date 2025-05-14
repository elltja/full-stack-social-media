import React from "react";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import { type Post } from "@prisma/client";
import { PostWithLikesSavesAndAuthor } from "@/lib/server/prisma";
import Image from "next/image";

export default function Post({ data }: { data: PostWithLikesSavesAndAuthor }) {
  return (
    <div className="w-[calc(100% - 40px)] h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
      <PostHeader
        author={data.author}
        createdAt={data.created_at}
        postId={data.id}
      />
      <p className="leading-6 break-all">{data.content}</p>

      <div className="flex flex-wrap gap-2">
        {data.image_urls.map((src, index) => (
          <Image
            key={src + index}
            width={400}
            height={150}
            src={src}
            alt={`Post image ${index + 1}`}
            className="rounded-md shadow"
          />
        ))}
      </div>
      <PostActions
        initialLikes={data.likes}
        initialSaves={data.saves}
        postId={data.id}
      />
    </div>
  );
}
