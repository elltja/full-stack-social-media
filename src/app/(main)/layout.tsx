import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { isAuthenticated } from "@/features/auth/lib/user";
import { redirect } from "next/navigation";

import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/accounts/signin");
  }

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
