import React from "react";

import Navigation from "./Navigation";

export default function Sidebar() {
  return (
    <div className="hidden h-full w-60 min-w-60 border border-gray-300 lg:block">
      <Navigation />
    </div>
  );
}
