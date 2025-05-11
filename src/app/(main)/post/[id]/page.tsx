import React from "react";
import Post from "@/modules/posts/components/Post";
import { prisma } from "@/lib/server/prisma";
import { notFound } from "next/navigation";
import Comment from "@/modules/comments/components/Comment";
import WriteComment from "@/modules/comments/components/WriteComment";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      likes: true,
      comments: {
        include: {
          author: {
            omit: { password: true, salt: true },
          },
        },
      },
      saves: true,
    },
  });
  if (!post) notFound();

  return (
    <div className="w-full p-4">
      <Post data={post} />
      <div className="my-5 w-full h-fit flex flex-col gap-4">
        <WriteComment postId={postId} />
        <div className="w-full px-5 flex flex-col gap-3">
          {post.comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                data={comment}
                author={comment.author}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
