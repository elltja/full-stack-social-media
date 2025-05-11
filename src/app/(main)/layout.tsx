import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { getCurrentUser } from "@/modules/auth/lib/user";
import AuthProvider from "@/lib/context/AuthContext";
import { redirect } from "next/navigation";

import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser.profile_completed) {
    redirect("/accounts/profile");
  }

  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <AuthProvider user={currentUser}>
        <Topbar />
        <div className="flex h-full">
          <Sidebar />
          {children}
        </div>
      </AuthProvider>
    </div>
  );
}
