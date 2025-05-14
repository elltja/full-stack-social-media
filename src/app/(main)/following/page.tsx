import { getCurrentUser } from "@/modules/auth/lib/user";
import { prisma } from "@/lib/server/prisma";
import Post from "@/modules/post/components/post/Post";
import React, { Suspense } from "react";
import PostSkeleton from "@/modules/post/components/PostSkeleton";
import { getFollowingUsers } from "@/modules/user/actions/following";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Following() {
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
  const currentUserFollowing = await getFollowingUsers(currentUser.id);
  const posts = await prisma.post.findMany({
    where: {
      author_id: {
        in: currentUserFollowing.map((f) => f.id),
      },
    },
    include: {
      author: true,
      likes: true,
      comments: true,
      saves: true,
    },
    orderBy: { created_at: "desc" },
  });
  return (
    <>
      {posts.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
    </>
  );
}
