"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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

export default function PostMenu({
  authorId,
  postId,
}: {
  authorId: string;
  postId: string;
}) {
  const user = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="text-gray-400 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {user.id === authorId ? (
              <DropdownMenuItem className="text-destructive cursor-pointer">
                <div
                  onClick={() => setIsOpen(true)}
                  className="flex gap-2 items-center"
                >
                  <TrashIcon className="text-destructive" />
                  <span className="hover:text-destructive text-sm">Delete</span>
                </div>
              </DropdownMenuItem>
            ) : (
              <p className="font-light m-auto text-sm text-gray-700 p-1">
                Nothing here
              </p>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                className="cursor-pointer bg-destructive hover:bg-destructive"
                onClick={() => deletePost(postId)}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
