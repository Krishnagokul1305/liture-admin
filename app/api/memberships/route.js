import dbConnect from "@/app/lib/db";
import membershipModel from "@/app/lib/model/membership.model";
import membershipRegistrationModel from "@/app/lib/model/membershipRegistration.model";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_FRONTEND_URL,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  try {
    await dbConnect();

    const memberships = await membershipModel.find({ isActive: true });

    return NextResponse.json(
      { success: true, data: memberships },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log(body);
    const { fullName, email, phoneNumber, reason, membership } = body;

    // 🔹 Basic validation
    if (!fullName || !email || !phoneNumber || !reason || !membership) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // 🔹 Check membership exists
    const membershipExists = await membershipModel.findById(membership);

    if (!membershipExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid membership selected",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    // 🔹 Optional: prevent duplicate registration for same membership
    const alreadyRegistered = await membershipRegistrationModel.findOne({
      email,
      membership,
    });

    if (alreadyRegistered) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already registered for this membership",
        },
        {
          status: 409,
          headers: corsHeaders,
        }
      );
    }

    // 🔹 Create registration
    const registration = await membershipRegistrationModel.create({
      fullName,
      email,
      phoneNumber,
      reason,
      membership,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Membership registration successful",
        data: registration,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
