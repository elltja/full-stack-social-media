import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import React from "react";

export default function Home() {
  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <Topbar />
      <div className="flex h-full">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
}
