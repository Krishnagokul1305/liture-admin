import dbConnect from "@/app/lib/db";
import webinarModel from "@/app/lib/model/webinar.model";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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
