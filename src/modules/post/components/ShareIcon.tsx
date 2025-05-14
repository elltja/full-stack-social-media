"use client";

import { env } from "@/env";
import { Send } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function ShareIcon({ postId }: { postId: string }) {
  function handleLinkCopy() {
    navigator.clipboard.writeText(`${env.NEXT_PUBLIC_BASE_URL}/post/${postId}`);
    toast("Link copied to clipboard");
  }
  return <Send strokeWidth={1.5} onClick={handleLinkCopy} />;
}
