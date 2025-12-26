import { NextResponse } from "next/server";
import { getAllWebinarsMinimal } from "@/service/webinarService";

export async function GET() {
  try {
    const data = await getAllWebinarsMinimal();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch internships" },
      { status: 500 }
    );
  }
}
