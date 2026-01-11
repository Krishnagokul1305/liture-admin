import { sendWelcomeEmail } from "@/app/lib/email";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sendWelcomeEmail("krishnagokul1729@gmail.com", "Gokul");

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully 🚀",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Email sending failed ❌" },
      { status: 500 }
    );
  }
}
