import { CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import ProfilePicture from "./ProfilePicture";
import { PublicUser } from "@/lib/server/prisma";
import FollowButton from "./FollowButton";
import { isFollowing } from "../actions/following";

export async function Username({ user }: { user: PublicUser }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <h3 className="cursor-pointer hover:underline">
          <Link href={`/@${user.account_name}`}>{user.name}</Link>
        </h3>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 border-gray-300">
        <div className="flex justify-between w-full">
          <ProfilePicture
            src={user.avatar_url || ""}
            name={user.name || ""}
            username={user.account_name}
            className="m-2"
          />
          <div className="w-full">
            <div className="w-full flex justify-between">
              <div>
                <h3 className="cursor-pointer hover:underline">
                  <Link href={`/@${user.account_name}`}>{user.name}</Link>
                </h3>
                <p className="text-sm">{user.bio}</p>
              </div>
              <FollowButton
                targetUserId={user.id}
                isFollowing={await isFollowing(user.id)}
              />
            </div>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined {user.created_at.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
