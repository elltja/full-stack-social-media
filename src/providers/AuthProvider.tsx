"use client";

import { SafeUser } from "@/lib/prisma";
import React, { createContext, useContext } from "react";
const AuthContext = createContext<SafeUser | null>(null);

export default function AuthProvider({
  user,
  children,
}: {
  user: SafeUser;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
