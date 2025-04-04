import { MapPin, Upload } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";

export default function WritePostFooter() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 text-gray-400 *:cursor-pointer">
        <ImageUploader />
        <Upload />
        <MapPin />
      </div>
      <Button className="cursor-pointer">Post</Button>
    </div>
  );
}
