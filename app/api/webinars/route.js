import dbConnect from "@/app/lib/db";
import webinarModel from "@/app/lib/model/webinar.model";
import { NextResponse } from "next/server";

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
        headers: {
          "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
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
        headers: {
          "Access-Control-Allow-Origin": "*", // allow all origins (for dev)
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
