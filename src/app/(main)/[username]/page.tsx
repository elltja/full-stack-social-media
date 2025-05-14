import ProfilePicture from "@/modules/user/components/ProfilePicture";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/server/prisma";
import { notFound } from "next/navigation";
import Post from "@/modules/post/components/post/Post";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
type ProfileParams = {
  username: string;
};

function parseUsername(params: ProfileParams) {
  if (!params.username.includes("%40")) {
    return null;
  }
  return params.username.replaceAll("%40", "");
}

export default async function Profile({
  params,
}: {
  params: Promise<ProfileParams>;
}) {
  const username = parseUsername(await params);

  if (!username) notFound();

  const user = await prisma.user.findUnique({
    where: { account_name: username },
    include: {
      posts: {
        include: {
          author: true,
          likes: true,
          saves: true,
        },
      },
    },
  });

  if (!user) notFound();

  return (
    <div className="w-full h-fit m-10 bg-background rounded-md shadow flex flex-col p-5 gap-10 md:gap-4">
      <div className="flex gap-5 items-center h-fit">
        <ProfilePicture
          src={user.avatar_url || ""}
          name={user.name || ""}
          username={user.account_name}
          style={{ width: 100, height: 100, fontSize: 50 }}
        />
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">{user.name}</h1>
          <p className="text-gray-700">{user.email}</p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold">Bio</h3>
        <p className="text-gray-500">{user.bio}</p>
      </div>
      <div>
        <h3 className="font-semibold">Joined</h3>
        <p className="text-gray-500">{user.created_at.toLocaleDateString()}</p>
      </div>
      <Separator />
      <div className="">
        <h2 className="font-bold text-xl my-2">Posts</h2>
        <ScrollArea className="h-[550px]">
          <div className="flex flex-col-reverse gap-3 px-2">
            {user.posts.map((post) => (
              <Post key={post.id} data={post} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
