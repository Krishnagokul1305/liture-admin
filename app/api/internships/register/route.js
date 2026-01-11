import dbConnect from "@/app/lib/db";
import internshipModel from "@/app/lib/model/internship.model";
import registrationModel from "@/app/lib/model/registration.model";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_FRONTEND_URL,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: corsHeaders,
    }
  );
}

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
          headers: corsHeaders,
        }
      );
    }

    const internshipExists = await internshipModel.findById(internship);
    if (!internshipExists) {
      return NextResponse.json(
        { success: false, message: "Invalid internship ID" },
        {
          status: 404,
          headers: corsHeaders,
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
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
