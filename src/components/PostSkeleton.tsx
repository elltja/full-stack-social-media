import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-full h-10 bg-gray-300" />
      <Skeleton className="w-full h-30 bg-gray-300" />
    </div>
  );
}
