import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import { Button } from "./ui/button";
import { Bookmark, List } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="hidden h-full w-60 min-w-60 border border-gray-300 lg:block">
      <div className="flex flex-col gap-4 items-center p-2">
        <ProfileDropdown />
        <Link href="/" legacyBehavior passHref>
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer"
          >
            <List />
            Feed
          </Button>
        </Link>
        <Link href="/saves" legacyBehavior passHref>
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer"
          >
            <Bookmark />
            Saves
          </Button>
        </Link>
      </div>
    </div>
  );
}
