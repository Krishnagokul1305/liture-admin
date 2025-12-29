import dbConnect from "@/app/lib/db";
import membershipModel from "@/app/lib/model/membership.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const memberships = await membershipModel.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { success: true, data: memberships },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
