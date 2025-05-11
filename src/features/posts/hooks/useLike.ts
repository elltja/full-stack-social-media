import { useAuth } from "@/lib/context/AuthContext";
import { Like } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { likePost, unLikePost } from "../actions/likes";

export default function useLike(postId: string, initialLikes: Like[]) {
  const user = useAuth();
  const [liked, setLiked] = useState<boolean>(
    !!initialLikes.find((like) => like.user_id === user?.id)
  );
  async function handleLike() {
    setLiked(true);
    await likePost(postId, user?.id);
    toast("Liked post", {
      description: new Date().toLocaleTimeString(),
      action: {
        label: "Undo",
        onClick: handleUnlike,
      },
    });
  }
  async function handleUnlike() {
    setLiked(false);
    await unLikePost(postId, user.id);
    toast("Unliked post", {
      description: new Date().toLocaleTimeString(),
      action: {
        label: "Undo",
        onClick: handleLike,
      },
    });
  }
  const toggleLike = () => (liked ? handleUnlike() : handleLike());
  return { liked, toggleLike };
}
