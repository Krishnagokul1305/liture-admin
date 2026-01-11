import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generic email sender
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log(process.env.EMAIL_FROM);
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error("Failed to send email");
    }

    return data;
  } catch (err) {
    console.error("Email send failed:", err);
    throw err;
  }
};

/**
 * Reset password email
 */

export function resetPasswordEmailTemplate({
  resetUrl,
  email,
  expiresIn = 10,
}) {
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;
              background-color:#ffffff; color:#1f2937; line-height:1.6;">

    <!-- Header -->
    <div style="background-color:#0f172a; padding:48px 40px; text-align:center;">
      <div style="max-width:600px; margin:0 auto;">
        <p style="margin:0 0 16px 0; font-size:12px; font-weight:600; color:#94a3b8; text-transform:uppercase; letter-spacing:1px;">
          Security Alert
        </p>
        <h1 style="margin:0 0 8px 0; font-size:28px; font-weight:700; color:#ffffff;">
          Password Reset Request
        </h1>
        <p style="margin:0; font-size:15px; color:#cbd5e1;">
          We received a request to reset your password. Click the button below to proceed.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div style="max-width:600px; margin:0 auto; padding:48px 40px;">

      <!-- CTA -->
      <div style="margin-bottom:48px; text-align:center;">
        <a href="${resetUrl}"
           style="display:inline-block; background-color:#2563eb; color:#ffffff;
                  padding:14px 32px; text-decoration:none; border-radius:8px;
                  font-weight:600; font-size:16px;">
          Reset Your Password
        </a>
      </div>

      <!-- Info -->
      <div style="background-color:#f0f9ff; border:1px solid #e0f2fe;
                  border-radius:8px; padding:24px; margin-bottom:32px;">
        <p style="margin:0; font-size:14px; color:#0c4a6e;">
          This reset link is associated with: <b>${email}</b><br/>
          It will expire in <b>${expiresIn} minutes</b>.
        </p>
      </div>

      <!-- Security Notice -->
      <div style="background-color:#fef2f2; border:1px solid #fee2e2;
                  border-radius:8px; padding:20px;">
        <p style="margin:0; font-size:14px; color:#7f1d1d;">
          <strong>Didn't request this?</strong> If you didn't ask to reset your password,
          please ignore this email. Your account remains secure.
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="max-width:600px; margin:0 auto; padding:32px 40px; text-align:center;
                font-size:12px; color:#9ca3af; border-top:1px solid #e5e7eb;">
      <p style="margin:0 0 6px 0;">
        This is an automated security email from Liture Auth.
      </p>
      <p style="margin:0;">
        © ${new Date().getFullYear()} Liture Auth Team. All rights reserved.
      </p>
    </div>

  </div>
  `;
}

export const sendResetPasswordEmail = async (to, resetUrl) => {
  const subject = "Reset Your Password";

  const html = resetPasswordEmailTemplate({
    resetUrl,
    email: to,
    expiresIn: 10,
  });

  await sendEmail({
    to,
    subject,
    html,
  });

  console.log("✅ Reset password email sent");
};

export const sendWelcomeEmail = async (to, name) => {
  const subject = "Welcome to Our App!";

  const html = `
   <div style="font-family: Arial, Helvetica, sans-serif; padding: 24px; max-width: 600px; margin: auto; color: #111827;">
  <h2 style="margin-bottom: 12px;">Welcome to the Liture Admin Portal</h2>

  <p>Dear ${name},</p>

  <p>
    Your administrator account has been successfully created and activated.
    You now have access to the Liture Admin Portal to manage users, content,
    and platform operations.
  </p>

  <p>
    Please ensure that your profile information is up to date and review
    your assigned permissions to begin managing the system effectively.
  </p>

  <p>
    If you encounter any issues or require assistance, please contact the
    system administrator or reply to this email for support.
  </p>

  <p style="margin-top: 32px;">
    Regards,<br />
    <strong>Liture Administration Team</strong>
  </p>

  <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />

  <p style="font-size: 12px; color: #6b7280;">
    This is an automated system message. Please do not share your login credentials
    with anyone. If you did not expect this email, contact support immediately.
  </p>
</div>

  `;

  await sendEmail({
    to,
    subject,
    html,
  });

  console.log("✅ Welcome email sent");
};
