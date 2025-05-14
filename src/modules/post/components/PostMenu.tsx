"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/context/AuthContext";
import { Ellipsis, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { deletePost } from "../actions/actions";
import Alert from "@/components/Alert";

export default function PostMenu({
  authorId,
  postId,
}: {
  authorId: string;
  postId: string;
}) {
  const user = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  if (user.id !== authorId) return null;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Open post options"
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <Ellipsis />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onSelect={() => setIsOpen(true)}
            >
              <TrashIcon className="mr-2 h-4 w-4 text-destructive" />
              <span className="text-destructive">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Alert
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete this post."
        actionText="Cancel"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        action={async () => {
          await deletePost(postId);
          setIsOpen(false);
        }}
      />
    </>
  );
}
