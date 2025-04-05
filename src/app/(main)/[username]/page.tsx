import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
type ProfileParams = {
  username: string;
};

function parseUsername(params: ProfileParams) {
  if (!params.username.includes("%40")) {
    return null;
  }
  return params.username.replaceAll("%40", "");
}

export default async function Profile({
  params,
}: {
  params: Promise<ProfileParams>;
}) {
  const username = parseUsername(await params);

  if (!username) notFound();

  const user = await prisma.user.findUnique({
    where: { account_name: username },
  });

  if (!user) notFound();

  return (
    <div>
      {username} {user.email}
    </div>
  );
}
