import React, { Suspense } from "react";
import Post from "@/modules/post/components/post/Post";
import PostComposer from "@/modules/post/components/composer/PostComposer";
import { ScrollArea } from "./ui/scroll-area";
import PostSkeleton from "../modules/post/components/PostSkeleton";
import { prisma } from "@/lib/server/prisma";

export default async function Feed() {
  return (
    <ScrollArea className="h-full w-full bg-gray-100 box-border no-scrollbar">
      <div className="flex flex-col gap-4 p-4 pb-15 box-border max-w-screen">
        <PostComposer />

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
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likes: true,
      comments: true,
      saves: true,
    },
  });
  return (
    <>
      {posts.map((post) => {
        return <Post data={post} key={post.id} />;
      })}
    </>
  );
}
