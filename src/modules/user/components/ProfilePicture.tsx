import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import Link from "next/link";

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
      <Avatar className="cursor-pointer w-fit h-fit">
        <AvatarImage
          src={src}
          alt={`${name}'s profile picture`}
          className={className}
          style={style}
        />
        <AvatarFallback className={className} style={style}>
          {secondLetter ? firstLetter + secondLetter : firstLetter}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
