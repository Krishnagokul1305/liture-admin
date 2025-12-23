import nodemailer from "nodemailer";

const smtpOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: "Next.js Auth <krishnagokul1729@gmail.com>",
    ...data,
  });
};

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

  console.log("Reset password email sent");
};

export const sendWelcomeEmail = async (to, name) => {
  const subject = "Welcome to Our App!";
  const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome, ${name}!</h2>
        <p>We're excited to have you join us. 🎉</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore our features</li>
          <li>Stay tuned for updates</li>
        </ul>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p style="margin-top: 30px;">Cheers,<br/>The Team 🚀</p>
      </div>
    `;

  await sendEmail({
    to,
    subject,
    html,
  });
  console.log("email sent");
};
