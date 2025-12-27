import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/auth/login",
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
