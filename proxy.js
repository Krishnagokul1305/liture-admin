import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { getCurrentUser } from "@/service/userService";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname.includes("/admin");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const hasAdminAccess = Boolean(user.is_staff) || Boolean(user.is_superuser);

    if (!hasAdminAccess) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
