import React from "react";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import { type Post } from "@prisma/client";
import { PostWithLikesSavesAndAuthor } from "@/lib/server/prisma";
import PostContent from "./PostContent";

export default function Post({ data }: { data: PostWithLikesSavesAndAuthor }) {
  return (
    <article className="w-full h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
      <PostHeader
        author={data.author}
        createdAt={data.created_at}
        postId={data.id}
      />
      <PostContent textContent={data.content} imageUrls={data.image_urls} />
      <PostActions
        initialLikes={data.likes}
        initialSaves={data.saves}
        postId={data.id}
      />
    </article>
  );
}
