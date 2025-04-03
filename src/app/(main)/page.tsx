import Feed from "@/components/Feed";
import { isAuthenticated } from "@/features/auth/lib/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  if (!(await isAuthenticated())) {
    redirect("/accounts/signin");
  }
  return <Feed />;
}
