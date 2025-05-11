"use client";

import { Button } from "@/components/ui/button";
import { followUser } from "../actions/actions";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function FollowButton({
  isFollowing,
  targetUserId,
}: {
  isFollowing: boolean;
  targetUserId: string;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      className="cursor-pointer w-[7.5em]"
      onClick={async () => {
        setLoading(true);
        await followUser(targetUserId);
        setLoading(false);
      }}
      variant={isFollowing ? "outline" : "default"}
      disabled={loading}
    >
      {loading ? (
        <LoaderCircle className="animate-spin" />
      ) : isFollowing ? (
        "Following"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
