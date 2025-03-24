import { ImageIcon } from "lucide-react";
import React from "react";

export default function ImageUploader() {
  return (
    <>
      <input type="file" id="file-upload" className="hidden" />
      <label htmlFor="file-upload">
        <ImageIcon className="cursor-pointer" />
      </label>
    </>
  );
}
