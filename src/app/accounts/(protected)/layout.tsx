import { getCurrentUser } from "@/modules/auth/lib/user";
import AuthProvider from "@/lib/context/AuthContext";
import React from "react";

export default async function ProtectedAccountsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const currentUser = await getCurrentUser();

  return <AuthProvider user={currentUser}>{children}</AuthProvider>;
}
