import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./modules/auth/lib/user";
import { env } from "./env";

export default async function middleware(request: NextRequest) {
  if (
    isProtectedRoute(request.nextUrl.pathname) &&
    !(await isAuthenticated())
  ) {
    return NextResponse.redirect(`${env.NEXT_PUBLIC_BASE_URL}/accounts/signin`);
  }
  return NextResponse.next();
}

function isProtectedRoute(pathname: string) {
  if (pathname === "/accounts/signup" || pathname === "/accounts/signin") {
    return false;
  }
  return true;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
