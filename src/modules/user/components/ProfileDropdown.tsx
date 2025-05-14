"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ProfilePicture from "./ProfilePicture";
import { Edit, LogOutIcon, User } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";
import { signOut } from "@/modules/auth/actions/actions";

export default function ProfileDropdown() {
  const user = useAuth();
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-black py-5 flex justify-start gap-3 w-full cursor-pointer"
        >
          <ProfilePicture
            src={user.avatar_url || ""}
            username={user.account_name}
            name={user.name || ""}
          />
          <div className="flex flex-col items-start">
            <h2 className="font-bold">{user.name}</h2>
            <p className="font-normal text-gray-700 text-xs">{user.email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/@${user.account_name}`}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/accounts/profile">
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={signOut} className="text-destructive">
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
