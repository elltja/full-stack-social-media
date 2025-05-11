import React from "react";
import Logo from "../Logo";
import MobileMenu from "../navigation/MobileMenu";

export default function Topbar() {
  return (
    <div className="w-screen p-4 outline outline-gray-300 flex items-center justify-between">
      <Logo />
      <MobileMenu />
    </div>
  );
}
