import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function ProfilePicture({
  src,
  name,
  username,
}: {
  src: string;
  name: string;
  username: string;
}) {
  const firstLetter = name.charAt(0).toUpperCase();
  const secondLetter = name.split(" ")[1]
    ? name.split(" ")[1].charAt(0).toUpperCase()
    : null;
  return (
    <Link href={`/@${username}`} legacyBehavior passHref>
      <Avatar className="cursor-pointer">
        <AvatarImage src={src} alt={`${name}'s profile picture`} />
        <AvatarFallback>
          {secondLetter ? firstLetter + secondLetter : firstLetter}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
