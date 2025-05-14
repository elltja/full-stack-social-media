import { X } from "lucide-react";
import Image from "next/image";

export default function ImageList({
  images,
  onImageDeletion,
}: {
  images: File[];
  onImageDeletion: (file: File) => void;
}) {
  if (images.length <= 0) return null;
  return (
    <div className="flex gap-5">
      {images.map((src, index) => (
        <div key={index} className="h-20 w-20 relative">
          <div className="absolute w-4 h-4 rounded-full bg-gray-600 opacity-65 text-white z-10 flex items-center justify-center text-center cursor-pointer -top-1 -left-1 p-[2]">
            <X onClick={() => onImageDeletion(src)} />
          </div>
          <Image
            src={URL.createObjectURL(src)}
            alt=""
            fill
            className="aspect-square object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
