import React, { Suspense } from "react";
import Post from "@/features/posts/components/Post";
import WritePost from "@/features/posts/components/WritePost";
import { ScrollArea } from "./ui/scroll-area";
import PostSkeleton from "../features/posts/components/PostSkeleton";
import { prisma } from "@/lib/prisma";

export default async function Feed() {
  return (
    <ScrollArea className="h-full w-full bg-gray-100 box-border no-scrollbar">
      <div className="flex flex-col gap-4 p-4 pb-15">
        <WritePost />

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
    </ScrollArea>
  );
}

async function SuspendedPosts() {
  const posts = await prisma.post.findMany();
  return (
    <>
      {posts.map((post) => {
        return <Post data={post} key={post.id} />;
      })}
    </>
  );
}
