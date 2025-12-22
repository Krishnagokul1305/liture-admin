import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // const session = await auth();
  // console.log(session);
  // if (!session) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|register|api|_next/static|_next/image|favicon.ico).*)"],
};
