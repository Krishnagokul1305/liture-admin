import dbConnect from "@/app/lib/db";
import internshipModel from "@/app/lib/model/internship.model";
import registrationModel from "@/app/lib/model/registration.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { fullName, email, phoneNumber, reason, internship } =
      await req.json();

    if (!fullName || !email || !phoneNumber || !reason || !internship) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const internshipExists = await internshipModel.findById(internship);
    if (!internshipExists) {
      return NextResponse.json(
        { success: false, message: "Invalid internship ID" },
        { status: 404 }
      );
    }

    const registration = await registrationModel.create({
      fullName,
      email,
      phoneNumber,
      reason,
      type: "internship",
      internship,
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
