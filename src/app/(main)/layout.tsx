import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <Topbar />
      <div className="flex h-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
