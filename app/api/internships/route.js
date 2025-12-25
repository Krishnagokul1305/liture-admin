import dbConnect from "@/app/lib/db";
import internshipModel from "@/app/lib/model/internship.model";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await dbConnect();
    const internships = await internshipModel.find();
    return NextResponse.json(
      {
        status: "success",
        data: internships,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
