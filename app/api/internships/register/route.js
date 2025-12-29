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
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    const internshipExists = await internshipModel.findById(internship);
    if (!internshipExists) {
      return NextResponse.json(
        { success: false, message: "Invalid internship ID" },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
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
      {
        status: 201,
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
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
