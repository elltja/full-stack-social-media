import { getCurrentUser } from "@/features/auth/lib/user";
import AuthProvider from "@/providers/AuthProvider";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProtectedAccountsLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/accounts/signin");

  return <AuthProvider user={user}>{children}</AuthProvider>;
}
