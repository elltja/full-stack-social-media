import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./modules/auth/lib/user";

export default async function middleware(request: NextRequest) {
  if (
    isProtectedRoute(request.nextUrl.pathname) &&
    !(await isAuthenticated())
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/signin`
    );
  }
  return NextResponse.next();
}

function isProtectedRoute(pathname: string) {
  const protectedRoutePatterns = [
    /^\/accounts\/profile$/,
    /^\/$/,
    /^\/post\/.*$/,
  ];
  return protectedRoutePatterns.some((pattern) => pattern.test(pathname));
}
