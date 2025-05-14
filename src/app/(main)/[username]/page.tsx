import ProfilePicture from "@/modules/user/components/ProfilePicture";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/server/prisma";
import { notFound } from "next/navigation";
import Post from "@/modules/post/components/post/Post";
import React from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { getCurrentUser } from "@/modules/auth/lib/user";
import { isFollowing } from "@/modules/user/actions/following";
import FollowButton from "@/modules/user/components/FollowButton";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
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

  const currentUser = await getCurrentUser();

  const joinDate = formatDistanceToNowStrict(user.created_at, {
    addSuffix: true,
  });

  <ProfilePicture
    src={user.avatar_url || ""}
    name={user.name || ""}
    username={user.account_name}
    className="w-25 h-25"
  />;

  return (
    <div className="w-full bg-background overflow-auto">
      {/* Header */}
      <div className="w-full p-5  flex flex-col gap-6">
        <div className="flex  gap-6 items-center">
          <ProfilePicture
            src={user.avatar_url || ""}
            name={user.name || ""}
            username={user.account_name}
            className="w-25 h-25"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.account_name}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-2 text-sm">
          <span>
            <strong>{user.posts.length}</strong> Posts
          </span>
          <span>
            <strong>{user.followers.length}</strong> Followers
          </span>
          <span>
            <strong>{user.following.length}</strong> Following
          </span>
        </div>
        {user.id !== currentUser.id ? (
          <FollowButton
            isFollowing={await isFollowing(user.id)}
            targetUserId={user.id}
          />
        ) : (
          <Link href="/accounts/profile">
            <Button variant="outline" className="w-fit cursor-pointer">
              <Edit /> Edit Profile
            </Button>
          </Link>
        )}

        <div>
          {/* Bio */}
          <div>
            <p className="text-gray-800 text-[17px]">
              {user.bio || "No bio provided."}
            </p>
          </div>

          {/* Join date */}
          <div>
            <span className="text-gray-500 text-sm">Joined {joinDate}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col h-fit gap-6 p-4 pb-20 no-scrollbar overflow-hidden bg-muted">
        {user.posts.map((post) => (
          <Post key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
