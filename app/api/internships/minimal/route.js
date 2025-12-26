import { NextResponse } from "next/server";
import { getAllInternshipsOptions } from "@/service/internshipService";

export async function GET() {
  try {
    const data = await getAllInternshipsOptions();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch internships" },
      { status: 500 }
    );
  }
}
