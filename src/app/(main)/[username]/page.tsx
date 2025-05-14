import ProfilePicture from "@/modules/user/components/ProfilePicture";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/server/prisma";
import { notFound } from "next/navigation";
import Post from "@/modules/post/components/post/Post";
import React from "react";
import { formatDistanceToNowStrict } from "date-fns";

type ProfileParams = {
  username: string;
};

function parseUsername(username: string) {
  if (!username.includes("%40")) {
    return null;
  }
  return username.replaceAll("%40", "");
}

export default async function Profile({
  params,
}: {
  params: Promise<ProfileParams>;
}) {
  const username = parseUsername((await params).username);
  if (!username) notFound();

  const user = await prisma.user.findUnique({
    where: { account_name: username },
    include: {
      followers: true,
      following: true,
      posts: {
        include: {
          author: true,
          likes: true,
          saves: true,
        },
      },
    },
  });

  if (!user || !user.profile_completed) notFound();

  const dateDisplay = formatDistanceToNowStrict(user.created_at, {
    addSuffix: true,
  });

  return (
    <div className="w-full m-10 bg-background rounded-md shadow p-5 flex flex-col gap-10">
      {/* Header */}
      <div className="flex gap-5 items-center">
        <ProfilePicture
          src={user.avatar_url || ""}
          name={user.name || ""}
          username={user.account_name}
          className="w-25 h-25"
        />
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">
            {user.name || user.account_name}
          </h1>
          <p className="text-gray-700">@{user.account_name}</p>
        </div>
      </div>

      <div className="flex gap-5">
        <div>
          <span className="font-semibold">{user.posts.length}</span>
          {"  "}
          <span className="text-gray-500 text-sm">Posts</span>
        </div>
        <div>
          <span className="font-semibold">{user.followers.length}</span>
          {"  "}
          <span className="text-gray-500 text-sm">Followers</span>
        </div>
        <div>
          <span className="font-semibold">{user.following.length}</span>
          {"  "}
          <span className="text-gray-500 text-sm">Following</span>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="font-semibold">Bio</h3>
        <p className="text-gray-500">{user.bio || "No bio provided."}</p>
      </div>

      {/* Join date */}
      <div>
        <h3 className="font-semibold">Joined</h3>
        <p className="text-gray-500">{dateDisplay}</p>
      </div>

      <Separator />

      {/* Posts */}
      <div>
        <h2 className="font-bold text-xl my-2">Posts</h2>
        <div className="flex flex-col-reverse gap-3 px-2">
          {user.posts.map((post) => (
            <Post key={post.id} data={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
