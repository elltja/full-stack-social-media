import { getCurrentUser } from "@/features/auth/lib/user";
import { prisma } from "@/lib/server/prisma";
import Post from "@/features/posts/components/Post";
import React, { Suspense } from "react";
import PostSkeleton from "@/features/posts/components/PostSkeleton";

export default async function Saves() {
  return (
    <div className="w-full p-5 flex flex-col gap-5">
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
  );
}

async function SuspendedPosts() {
  const user = await getCurrentUser();
  const saves = await prisma.save.findMany({
    where: {
      user_id: user.id,
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
