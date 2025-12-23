import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    return NextResponse.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
