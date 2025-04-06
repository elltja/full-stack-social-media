"use client";

import { Bookmark } from "lucide-react";
import React, { useState } from "react";
import { savePost, unSavePost } from "../actions/actions";
import { useAuth } from "@/providers/AuthProvider";
import { SafeUser } from "@/lib/prisma";
import { toast } from "sonner";
import { Save } from "@prisma/client";

export default function SaveIcon({
  postId,
  saves,
}: {
  postId: string;
  saves: Save[];
}) {
  const user = useAuth() as SafeUser;
  const [saved, setSaved] = useState<boolean>(
    !!saves.find((save) => save.user_id === user.id)
  );
  async function handleSave() {
    setSaved(true);
    await savePost(postId, user.id);
    toast("Saved post", {
      description: new Date().toLocaleTimeString(),
      action: {
        label: "Undo",
        onClick: handleUnsave,
      },
    });
  }
  async function handleUnsave() {
    setSaved(false);
    await unSavePost(postId, user.id);
    toast("Unsaved post", {
      description: new Date().toLocaleTimeString(),
      action: {
        label: "Undo",
        onClick: handleSave,
      },
    });
  }
  return (
    <Bookmark
      onClick={saved ? handleUnsave : handleSave}
      fill={saved ? "yello" : "transparent"}
      stroke={saved ? "yello" : "currentColor"}
      strokeWidth={1.5}
    />
  );
}
