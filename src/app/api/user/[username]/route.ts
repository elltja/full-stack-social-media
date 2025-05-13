import { prisma } from "@/lib/server/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const accountName = (await params).username;
  const user = await prisma.user.findUnique({
    where: {
      account_name: accountName,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}
