import { getCurrentUser } from "@/modules/auth/lib/user";
import { prisma } from "@/lib/server/prisma";
import Post from "@/modules/post/components/post/Post";
import React, { Suspense } from "react";
import PostSkeleton from "@/modules/post/components/PostSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Saves() {
  return (
    <ScrollArea className="h-full w-full bg-muted">
      <div className="flex flex-col gap-6 p-4 pb-20">
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
  const currentUser = await getCurrentUser();
  const saves = await prisma.save.findMany({
    where: {
      user_id: currentUser.id,
    },
    include: {
      post: {
        include: {
          author: true,
          likes: true,
          comments: true,
          saves: true,
        },
      },
    },
  });
  return (
    <>
      {saves.map((save) => {
        return <Post key={save.post.id} data={save.post} />;
      })}
    </>
  );
}
