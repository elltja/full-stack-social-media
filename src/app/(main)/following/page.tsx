import { getCurrentUser } from "@/modules/auth/lib/user";
import { prisma } from "@/lib/server/prisma";
import Post from "@/modules/posts/components/post/Post";
import React, { Suspense } from "react";
import PostSkeleton from "@/modules/posts/components/PostSkeleton";
import { getFollowingUsers } from "@/modules/user/actions/following";

export default async function Following() {
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
  });
  return (
    <>
      {posts.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
    </>
  );
}
