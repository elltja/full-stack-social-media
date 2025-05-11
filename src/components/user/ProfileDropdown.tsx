"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import ProfilePicture from "./ProfilePicture";
import { Edit, LogOutIcon, User } from "lucide-react";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";
import { signOut } from "@/modules/auth/actions/actions";

export default function ProfileDropdown() {
  const user = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-black cursor-pointer py-5 flex justify-start"
        >
          <ProfilePicture
            src={user.avatar_url || ""}
            username={user.account_name}
            name={user.name || ""}
          />
          <div className="flex flex-col items-start">
            <h2 className="fonst-bold">{user.name}</h2>
            <p className="font-normal text-gray-700 text-xs">{user.email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <Link href={`/@${user.account_name}`} legacyBehavior passHref>
            <DropdownMenuItem className="cursor-pointer">
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/accounts/profile" legacyBehavior passHref>
            <DropdownMenuItem className="cursor-pointer">
              <Edit />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/accounts/profile" legacyBehavior passHref>
            <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
              <LogOutIcon />
              <span>Log out</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
