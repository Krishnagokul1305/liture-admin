import { auth } from "@/app/lib/auth";
import { getCurrentUser } from "@/service/userService";
import { NextResponse } from "next/server";

export async function GET() {
  const currentUser = await getCurrentUser();

  return NextResponse.json({ user: currentUser });
}
