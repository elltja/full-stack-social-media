import { Ellipsis } from "lucide-react";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import { Username } from "./Username";

export default function PostHeader() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <ProfilePicture
          src="https://github.com/shadcn.png"
          name="John Doe"
          username="john_doe"
        />
        <div className="flex flex-col">
          <Username name="John Doe" username="john_doe" />
          <p className="text-gray-400">20 minutes ago</p>
        </div>
      </div>
      <Ellipsis className="text-gray-400" />
    </div>
  );
}
