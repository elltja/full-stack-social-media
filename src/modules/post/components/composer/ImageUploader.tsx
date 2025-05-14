import { ImageIcon } from "lucide-react";
import React, { InputHTMLAttributes } from "react";

export default function ImageUploader({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        name="images"
        multiple
        {...props}
      />
      <label htmlFor="file-upload">
        <ImageIcon className="cursor-pointer" />
      </label>
    </>
  );
}
