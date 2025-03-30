import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/intrilo.svg"
      alt="Intrilo logo"
      width={100}
      height={100}
      className={cn("w-auto h-4", className)}
    />
  );
}
