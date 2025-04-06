import { CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import ProfilePicture from "./ProfilePicture";
import { SafeUser } from "@/lib/prisma";

export function Username({ user }: { user: SafeUser }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <h3 className="cursor-pointer hover:underline">
          <Link href={`/@${user.account_name}`}>{user.name}</Link>
        </h3>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 border-gray-300">
        <div className="flex justify-between space-x-4 w-fit">
          <ProfilePicture
            src={user.avatar_url || ""}
            name={user.name || ""}
            username={user.account_name}
          />
          <div className="space-y-1">
            <h3 className="cursor-pointer hover:underline">
              <Link href={`/@${user.account_name}`}>{user.name}</Link>
            </h3>
            <p className="text-sm">{user.bio}</p>
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
