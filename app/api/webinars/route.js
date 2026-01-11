import dbConnect from "@/app/lib/db";
import registrationModel from "@/app/lib/model/registration.model";
import webinarModel from "@/app/lib/model/webinar.model";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_FRONTEND_URL,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(req) {
  try {
    await dbConnect();

    const data = await webinarModel.find({
      status: "active",
    });

    return NextResponse.json(
      {
        status: "success",
        data,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Something went wrong",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const { fullName, email, phoneNumber, reason, webinar } = await req.json();

    if (!fullName || !email || !phoneNumber || !reason || !webinar) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const webinarExists = await webinarModel.findById(webinar);
    if (!webinarExists) {
      return NextResponse.json(
        { success: false, message: "Invalid webinar ID" },
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
      type: "webinar",
      webinar,
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
