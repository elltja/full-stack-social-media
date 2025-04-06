import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CommentIcon({ postId }: { postId: string }) {
  return (
    <Link href={`/post/${postId}`}>
      <MessageCircle strokeWidth={1.5} />
    </Link>
  );
}
