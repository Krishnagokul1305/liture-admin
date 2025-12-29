import dbConnect from "@/app/lib/db";
import registrationModel from "@/app/lib/model/registration.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { fullName, email, phoneNumber, reason, type, internship, webinar } =
      body;

    if (!fullName || !email || !phoneNumber || !reason || !type) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type === "internship" && !internship) {
      return NextResponse.json(
        { message: "Internship ID is required for internship registration" },
        { status: 400 }
      );
    }

    if (type === "webinar" && !webinar) {
      return NextResponse.json(
        { message: "Webinar ID is required for webinar registration" },
        { status: 400 }
      );
    }

    // 🚀 Create registration
    const registration = await registrationModel.create({
      fullName,
      email,
      phoneNumber,
      reason,
      type,
      internship: type === "internship" ? internship : undefined,
      webinar: type === "webinar" ? webinar : undefined,
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        registration: {
          ...registration.toObject(),
          _id: registration._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "Failed to register" },
      { status: 500 }
    );
  }
}
