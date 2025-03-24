import React from "react";
import Post from "./Post";
import WritePost from "./WritePost";
import { ScrollArea } from "./ui/scroll-area";
import PostSkeleton from "./PostSkeleton";

export default function Feed() {
  const isLoading = false;
  return (
    <ScrollArea className="h-full w-full bg-gray-100 box-border no-scrollbar">
      <div className="flex flex-col gap-4 p-4 pb-15">
        <WritePost />
        {isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          <>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </>
        )}
      </div>
    </ScrollArea>
  );
}
