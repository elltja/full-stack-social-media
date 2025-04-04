import React from "react";
import ProfilePicture from "@/components/ProfilePicture";

export default function WritePostHeader({
  textContent,
  error,
}: {
  textContent: string;
  error: string | null;
}) {
  return (
    <div className="w-full flex gap-3 items-start">
      <div className="h-fit w-fit my-1">
        <ProfilePicture
          src="https://github.com/shadcn.png"
          name="john Doe"
          username="john_doe"
        />
      </div>
      <div className="flex flex-col w-full">
        <textarea
          placeholder="What's on your mind?"
          className="flex-1 h-fit field-sizing-content max-h-96 py-2 px-4 outline-none bg-gray-100 rounded-lg resize-none"
          name="text"
          defaultValue={textContent}
        />
        {error && <p className="text-destructive">{error}</p>}
      </div>
    </div>
  );
}
