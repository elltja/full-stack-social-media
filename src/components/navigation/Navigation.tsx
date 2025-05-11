import React from "react";
import ProfileDropdown from "../../modules/user/components/ProfileDropdown";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bookmark, List, Users } from "lucide-react";

export default function Navigation() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <ProfileDropdown />
      <Link href="/" legacyBehavior passHref>
        <Button variant="ghost" className="w-full justify-start cursor-pointer">
          <List />
          Feed
        </Button>
      </Link>
      <Link href="/saves" legacyBehavior passHref>
        <Button variant="ghost" className="w-full justify-start cursor-pointer">
          <Bookmark />
          Saves
        </Button>
      </Link>
      <Link href="/following" legacyBehavior passHref>
        <Button variant="ghost" className="w-full justify-start cursor-pointer">
          <Users />
          Following
        </Button>
      </Link>
    </div>
  );
}
