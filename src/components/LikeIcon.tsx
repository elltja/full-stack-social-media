"use client";

import { Heart } from "lucide-react";
import React, { useState } from "react";

export default function LikeIcon() {
  const [liked, setLiked] = useState(false);

  return (
    <Heart
      onClick={() => setLiked((prev) => !prev)}
      fill={liked ? "red" : "transparent"}
      stroke={liked ? "red" : "currentColor"}
      strokeWidth={liked ? 0 : 1.5}
    />
  );
}
