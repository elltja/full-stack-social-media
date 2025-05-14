import React from "react";
import ProfilePicture from "@/modules/user/components/ProfilePicture";
import { Username } from "@/modules/user/components/Username";
import { PublicUser } from "@/lib/server/prisma";
import { formatDistanceToNowStrict } from "date-fns";
import PostMenu from "../PostMenu";

export default function PostHeader({
  author,
  createdAt,
  postId,
}: {
  author: PublicUser;
  createdAt: Date;
  postId: string;
}) {
  const dateDisplay = formatDistanceToNowStrict(createdAt, { addSuffix: true });

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <ProfilePicture
          src={author.avatar_url || ""}
          name={author.name || author.account_name}
          username={author.account_name}
        />
        <div className="flex flex-col">
          <Username userData={author} />
          <p className="text-gray-400">{dateDisplay}</p>
        </div>
      </div>
      <PostMenu
        authorId={author.id}
        postId={postId}
        aria-label="Post options menu"
      />
    </header>
  );
}
