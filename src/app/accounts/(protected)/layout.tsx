import { getCurrentUser } from "@/features/auth/lib/user";
import AuthProvider from "@/lib/context/AuthContext";
import React from "react";

export default async function ProtectedAccountsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const user = await getCurrentUser();

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
