import { CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import ProfilePicture from "./ProfilePicture";

export function Username({
  name,
  username,
}: {
  name: string;
  username: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <h3 className="cursor-pointer hover:underline">
          <Link href={`/@${username}`}>{name}</Link>
        </h3>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 border-gray-300">
        <div className="flex justify-between space-x-4">
          <ProfilePicture
            src="https://github.com/shadcn.png"
            name={name}
            username={username}
          />
          <div className="space-y-1">
            <h3 className="cursor-pointer hover:underline">
              <Link href={`/@${username}`}>{name}</Link>
            </h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusda
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
