import dbConnect from "@/app/lib/db";
import registrationModel from "@/app/lib/model/registration.model";
import webinarModel from "@/app/lib/model/webinar.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { fullName, email, phoneNumber, reason, webinar } = await req.json();

    if (!fullName || !email || !phoneNumber || !reason || !webinar) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const webinarExists = await webinarModel.findById(webinar);
    if (!webinarExists) {
      return NextResponse.json(
        { success: false, message: "Invalid webinar ID" },
        { status: 404 }
      );
    }

    const registration = await registrationModel.create({
      fullName,
      email,
      phoneNumber,
      reason,
      type: "webinar",
      webinar,
    });

    return NextResponse.json(
      { success: true, data: registration },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
