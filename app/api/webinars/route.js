import dbConnect from "@/app/lib/db";
import webinarModel from "@/app/lib/model/webinar.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const data = await webinarModel.find();

    return NextResponse.json(
      {
        status: "success",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
