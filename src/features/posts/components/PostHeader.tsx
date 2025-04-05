import { Ellipsis } from "lucide-react";
import React from "react";
import ProfilePicture from "@/components/ProfilePicture";
import { Username } from "@/components/Username";
import { SafeUser } from "@/lib/prisma";

export default function PostHeader({
  user,
  createdAt,
}: {
  user: SafeUser;
  createdAt: Date;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <ProfilePicture
          src={user.avatar_url || ""}
          name={user.name || user.account_name}
          username={user.account_name}
        />
        <div className="flex flex-col">
          <Username user={user} />
          <p className="text-gray-400">{createdAt.toLocaleDateString()}</p>
        </div>
      </div>
      <Ellipsis className="text-gray-400" />
    </div>
  );
}
