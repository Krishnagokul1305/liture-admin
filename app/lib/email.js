import nodemailer from "nodemailer";

const smtpHost = process.env.EMAIL_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.EMAIL_PORT || 465);
const smtpUser = process.env.EMAIL_HOST_USER;
const smtpPass = process.env.EMAIL_HOST_PASSWORD;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

/**
 * Generic email sender
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!smtpUser || !smtpPass) {
      throw new Error("Missing EMAIL_HOST_USER or EMAIL_HOST_PASSWORD");
    }

    const from = process.env.EMAIL_FROM || smtpUser;
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return info;
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
  expiresInHours = 24,
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Password Reset Request</title>
    <style>
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
      color: #1f2937;
      line-height: 1.6;
    "
  >
    <div style="width: 100%; background-color: #ffffff">
      <div
        style="
          background-color: #0f172a;
          padding: 48px 40px;
          text-align: center;
        "
      >
        <div style="max-width: 600px; margin: 0 auto">
          <p
            style="
              margin: 0 0 16px 0;
              font-size: 12px;
              font-weight: 600;
              color: #94a3b8;
              text-transform: uppercase;
              letter-spacing: 1px;
            "
          >
            Security Alert
          </p>
          <h1
            style="
              margin: 0 0 8px 0;
              font-size: 28px;
              font-weight: 700;
              color: #ffffff;
            "
          >
            Password Reset Request
          </h1>
          <p style="margin: 0; font-size: 15px; color: #cbd5e1">
            We received a request to reset your password. Click the button below
            to proceed.
          </p>
        </div>
      </div>

      <div style="max-width: 600px; margin: 0 auto; padding: 48px 40px">
        <div style="margin-bottom: 48px; text-align: center">
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              background-color: #2563eb;
              color: #ffffff;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
            "
          >
            Reset Your Password
          </a>
        </div>

        <div
          style="
            background-color: #f0f9ff;
            border: 1px solid #e0f2fe;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 32px;
          "
        >
          <p style="margin: 0; font-size: 14px; color: #0c4a6e">
            This reset link is associated with: <b>${email}</b><br />
            It will expire in <b>${expiresInHours} hours</b>.
          </p>
        </div>

        <div
          style="
            background-color: #fef2f2;
            border: 1px solid #fee2e2;
            border-radius: 8px;
            padding: 20px;
          "
        >
          <p style="margin: 0; font-size: 14px; color: #7f1d1d">
            <strong>Didn't request this?</strong> If you didn't ask to reset
            your password, please ignore this email. Your account remains
            secure.
          </p>
        </div>
      </div>

      <div
        style="
          max-width: 600px;
          margin: 0 auto;
          padding: 32px 40px;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          border-top: 1px solid #e5e7eb;
        "
      >
        <p style="margin: 0 0 6px 0">
          This is an automated security email from Liture Auth.
        </p>
        <p style="margin: 0">
          &copy; ${new Date().getFullYear()} Liture Auth Team. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
`;
}

export const sendResetPasswordEmail = async (to, resetUrl) => {
  const subject = "Reset Your Password";

  const html = resetPasswordEmailTemplate({
    resetUrl,
    email: to,
    expiresInHours: 24,
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

export function contactFormEmailTemplate({ name, email, phone, message }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        border: 1px solid #eee;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      }
      .header {
        background-color: #d32f2f;
        color: #ffffff;
        padding: 25px;
        text-align: center;
      }
      .content {
        padding: 30px;
        background-color: #ffffff;
      }
      .field-label {
        font-weight: bold;
        color: #d32f2f;
        text-transform: uppercase;
        font-size: 11px;
        letter-spacing: 1.2px;
        margin-bottom: 5px;
      }
      .field-value {
        margin-bottom: 25px;
        padding: 12px;
        background-color: #fff5f5;
        border-radius: 6px;
        border-left: 4px solid #d32f2f;
        font-size: 15px;
      }
      .footer {
        background-color: #f9f9f9;
        color: #999;
        text-align: center;
        padding: 20px;
        font-size: 12px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin: 0; font-size: 24px">New Message Received</h1>
      </div>
      <div class="content">
        <div class="field-label">Sender Name</div>
        <div class="field-value"><strong>${name ?? "-"}</strong></div>

        <div class="field-label">Email Address</div>
        <div class="field-value">${email ?? "-"}</div>

        <div class="field-label">Phone Number</div>
        <div class="field-value">${phone ?? "-"}</div>

        <div class="field-label">Message Content</div>
        <div style="white-space: pre-wrap" class="field-value">${
          message ?? "-"
        }</div>
      </div>
      <div class="footer">
        Sent via Website Contact Form &bull; System Notification
      </div>
    </div>
  </body>
</html>
`;
}

export const sendContactFormEmail = async ({ name, email, phone, message }) => {
  const subject = "New Contact Form Message";
  const html = contactFormEmailTemplate({ name, email, phone, message });
  const to = smtpUser;

  await sendEmail({
    to,
    subject,
    html,
  });

  console.log("✅ Contact form email sent");
};
