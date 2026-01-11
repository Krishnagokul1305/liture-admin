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
export const sendResetPasswordEmail = async (to, resetUrl) => {
  const subject = "Reset Your Password";

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2>Password Reset Request</h2>

      <p>You requested to reset your password.</p>

      <p>
        Click the button below to set a new password.
        This link will expire in <b>10 minutes</b>.
      </p>

      <div style="margin: 30px 0;">
        <a
          href="${resetUrl}"
          style="
            background-color: #2563eb;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
          "
        >
          Reset Password
        </a>
      </div>

      <p style="color: #555;">
        If you did not request this, you can safely ignore this email.
      </p>

      <p style="margin-top: 30px;">
        Regards,<br />
        <b>Liture Auth Team</b>
      </p>
    </div>
  `;

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
