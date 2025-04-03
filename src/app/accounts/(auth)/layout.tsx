import Logo from "@/components/Logo";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center pt-40 sm:pt-0 overflow-y-auto">
        <Logo className="absolute top-5 left-5 h-5" />
        {children}
      </div>
    </>
  );
}
