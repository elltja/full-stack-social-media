import React from "react";
import ProfilePicture from "./ProfilePicture";

export default function WritePostHeader() {
  return (
    <div className="w-full flex gap-3 items-center">
      <ProfilePicture
        src="https://github.com/shadcn.png"
        name="john Doe"
        username="john_doe"
      />
      <textarea
        placeholder="What's on your mind?"
        className="flex-1 h-fit field-sizing-content py-2 px-4 outline-none bg-gray-100 rounded-lg resize-none"
      />
    </div>
  );
}
