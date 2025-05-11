import React from "react";
import ProfilePicture from "@/modules/user/components/ProfilePicture";
import { Username } from "@/modules/user/components/Username";
import { PublicUser } from "@/lib/server/prisma";
import PostMenu from "./PostMenu";
import { Post } from "@prisma/client";

export default function PostHeader({
  author,
  data,
}: {
  author: PublicUser;
  data: Post;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <ProfilePicture
          src={author.avatar_url || ""}
          name={author.name || author.account_name}
          username={author.account_name}
        />
        <div className="flex flex-col">
          <Username user={author} />
          <p className="text-gray-400">
            {data.created_at.toLocaleDateString()}
          </p>
        </div>
      </div>
      <PostMenu authorId={author.id} postId={data.id} />
    </div>
  );
}
