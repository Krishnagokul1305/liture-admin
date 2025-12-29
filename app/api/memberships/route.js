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
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
