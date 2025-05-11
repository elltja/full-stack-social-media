"use client";

import { PublicUser } from "@/lib/server/prisma";
import React, { createContext, useContext } from "react";
const AuthContext = createContext<PublicUser | null>(null);

export default function AuthProvider({
  user,
  children,
}: {
  user: PublicUser;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "A component must be wrapped with AuthProvider in order to use useAuth"
    );
  }
  return context;
};
