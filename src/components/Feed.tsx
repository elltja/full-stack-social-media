import React, { Suspense } from "react";
import Post from "@/modules/post/components/post/Post";
import PostComposer from "@/modules/post/components/composer/PostComposer";
import PostSkeleton from "@/modules/post/components/PostSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { prisma } from "@/lib/server/prisma";

export default async function Feed() {
  return (
    <ScrollArea className="h-full w-full bg-muted">
      <div className="flex flex-col gap-6 p-4 pb-20">
        <PostComposer />
        <Suspense
          fallback={
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
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
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likes: true,
      saves: true,
    },
    orderBy: { created_at: "desc" },
  });

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </>
  );
}
