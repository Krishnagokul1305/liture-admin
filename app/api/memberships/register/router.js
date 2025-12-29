import dbConnect from "@/app/lib/db";
import membershipRegistrationModel from "@/app/lib/model/membershipRegistration.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
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
          headers: {
            "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    // 🔹 Check membership exists
    const membershipExists = await membershipRegistrationModel.findById(
      membership
    );
    if (!membershipExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid membership selected",
        },
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
          headers: {
            "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
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
        headers: {
          "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
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
        headers: {
          "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
