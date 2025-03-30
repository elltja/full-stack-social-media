import React from "react";
import ProfilePicture from "./ProfilePicture";

export default function WritePostHeader() {
  return (
    <div className="w-full flex gap-3 items-start">
      <div className="h-fit w-fit my-1">
        <ProfilePicture
          src="https://github.com/shadcn.png"
          name="john Doe"
          username="john_doe"
        />
      </div>
      <textarea
        placeholder="What's on your mind?"
        className="flex-1 h-fit field-sizing-content max-h-96 py-2 px-4 outline-none bg-gray-100 rounded-lg resize-none"
      />
    </div>
  );
}
