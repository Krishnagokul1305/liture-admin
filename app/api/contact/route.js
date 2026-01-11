import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NEXT_FRONTEND_URL,
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    await resend.emails.send({
      from: "Support <support@admin.liture.in>",
      to: process.env.EMAIL_RECEIVE,
      subject: "New Contact Form Submission",
      html: `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;
              background-color:#ffffff; color:#1f2937; line-height:1.6;">

    <!-- Header -->
    <div style="background-color:#ffffff; padding:48px 40px; text-align:left;">
      <div style="max-width:600px; margin:0 auto;">
        <p style="margin:0 0 12px 0; font-size:12px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:1px;">
          New Message
        </p>
        <h1 style="margin:0 0 16px 0; font-size:32px; font-weight:700; color:#111827; line-height:1.2;">
          Contact Submission
        </h1>
        <p style="margin:0; font-size:16px; color:#6b7280;">
          You've received a new message from ${name}. Review the details below.
        </p>
      </div>
    </div>

    <div style="max-width:600px; margin:0 auto; height:1px; background-color:#e5e7eb;"></div>

    <!-- Main Content -->
    <div style="max-width:600px; margin:0 auto; padding:40px;">

      <!-- User Info -->
      <div style="margin-bottom:40px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
          <tr>
            <td width="50%">
              <p style="margin:0 0 8px 0; font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase;">
                From
              </p>
              <p style="margin:0; font-size:16px; font-weight:500; color:#111827;">
                ${name}
              </p>
            </td>

            <td width="50%">
              <p style="margin:0 0 8px 0; font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase;">
                Email
              </p>
              <a href="mailto:${email}" style="font-size:16px; color:#2563eb; text-decoration:none; font-weight:500;">
                ${email}
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 8px 0; font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase;">
          Phone
        </p>
        <a href="tel:${phone}" style="font-size:16px; color:#2563eb; text-decoration:none; font-weight:500;">
          ${phone}
        </a>
      </div>

      <!-- Message -->
      <div style="margin-bottom:40px;">
        <p style="margin:0 0 12px 0; font-size:11px; font-weight:700; color:#9ca3af; text-transform:uppercase;">
          Message
        </p>
        <div style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:6px;
                    padding:20px; font-size:15px; color:#374151; line-height:1.7; white-space:pre-wrap;">
          ${message}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="max-width:600px; margin:0 auto; padding:32px 40px; border-top:1px solid #e5e7eb;
                text-align:center; font-size:12px; color:#9ca3af;">
      <p style="margin:0;">
        This message was submitted through your contact form.
      </p>
    </div>

  </div>
  `,
    });

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      { success: false, message: "Email failed" },
      { status: 500, headers: corsHeaders }
    );
  }
}
