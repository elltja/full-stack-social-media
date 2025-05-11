import React, { Suspense } from "react";
import Post from "@/features/posts/components/Post";
import WritePost from "@/features/posts/components/WritePost";
import { ScrollArea } from "./ui/scroll-area";
import PostSkeleton from "../features/posts/components/PostSkeleton";
import { PostWithLikesSavesAndAuthor, prisma } from "@/lib/server/prisma";

export default async function Feed() {
  return (
    <ScrollArea className="h-full w-full bg-gray-100 box-border no-scrollbar">
      <div className="flex flex-col gap-4 p-4 pb-15 box-border max-w-screen">
        <WritePost />

        <div className="flex flex-col-reverse gap-4 max-w-full">
          <Suspense
            fallback={
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            }
          >
            <SuspendedPosts />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  );
}

async function SuspendedPosts() {
  const posts = (await prisma.post.findMany({
    include: {
      author: true,
      likes: true,
      comments: true,
      saves: true,
    },
  })) as PostWithLikesSavesAndAuthor[];
  return (
    <>
      {posts.map((post) => {
        return <Post data={post} key={post.id} />;
      })}
    </>
  );
}
