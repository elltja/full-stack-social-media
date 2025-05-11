import ProfilePicture from "@/modules/user/components/ProfilePicture";
import { Username } from "@/modules/user/components/Username";
import { PublicUser } from "@/lib/server/prisma";
import { type Comment } from "@prisma/client";
import React from "react";

export default function Comment({
  data,
  author,
}: {
  data: Comment;
  author: PublicUser;
}) {
  return (
    <div className="h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
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
      </div>
      <p>{data.content}</p>
    </div>
  );
}
