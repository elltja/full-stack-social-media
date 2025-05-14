import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfilePicture({
  src,
  name,
  username,
  className,
  style,
}: {
  src: string;
  name: string;
  username: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const firstLetter = name.charAt(0).toUpperCase();
  const secondLetter = name.split(" ")[1]
    ? name.split(" ")[1].charAt(0).toUpperCase()
    : null;
  return (
    <Link href={`/@${username}`} legacyBehavior passHref>
      <Avatar
        className={cn("cursor-pointer aspect-square rounded-full", className)}
      >
        <AvatarImage
          src={src}
          alt={`${name}'s profile picture`}
          className="aspect-square object-cover w-full h-full"
          style={style}
        />
        <AvatarFallback className={className} style={style}>
          {secondLetter ? firstLetter + secondLetter : firstLetter}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
