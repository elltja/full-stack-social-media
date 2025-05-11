import { useAuth } from "@/lib/context/AuthContext";
import { useState } from "react";
import { PublicUser } from "@/lib/server/prisma";
import { toast } from "sonner";
import { Save } from "@prisma/client";
import { savePost, unSavePost } from "../actions/saves";

export default function useSave(postId: string, initialSaves: Save[]) {
  const user = useAuth() as PublicUser;
  const [saved, setSaved] = useState<boolean>(
    !!initialSaves.find((save) => save.user_id === user?.id)
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
  const toggleSave = () => (saved ? handleUnsave() : handleSave());
  return { saved, toggleSave };
}
