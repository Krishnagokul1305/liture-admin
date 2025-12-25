import dbConnect from "@/app/lib/db";
import internshipModel from "@/app/lib/model/internship.model";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await dbConnect();
    const internships = await internshipModel.find();
    return NextResponse.json({
      status: "success",
      data: internships,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
