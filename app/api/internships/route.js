import dbConnect from "@/app/lib/db";
import internshipModel from "@/app/lib/model/internship.model";
import { NextResponse } from "next/server";

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
