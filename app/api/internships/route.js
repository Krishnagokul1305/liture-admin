import dbConnect from "@/app/lib/db";
import internshipModel from "@/app/lib/model/internship.model";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_FRONTEND_URL,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(req, res) {
  try {
    await dbConnect();
    const internships = await internshipModel.find({
      status: "active",
    });
    return NextResponse.json(
      {
        status: "success",
        data: internships,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
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
