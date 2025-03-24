import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <Image
      src="/intrilo.svg"
      alt="Intrilo logo"
      width={100}
      height={100}
      className="w-auto h-4"
    />
  );
}
