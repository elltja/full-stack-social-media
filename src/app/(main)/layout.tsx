import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { getCurrentUser } from "@/features/auth/lib/user";
import AuthProvider from "@/providers/AuthProvider";
import { redirect } from "next/navigation";

import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/accounts/signin");
  }

  if (!user.profile_completed) {
    redirect("/accounts/profile");
  }

  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <Topbar />
      <div className="flex h-full">
        <Sidebar />
        <AuthProvider user={user}>{children}</AuthProvider>
      </div>
    </div>
  );
}
