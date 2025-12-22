import nodemailer from "nodemailer";

const smtpOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "krishnagokulkrishna2005@gmail.com",
    pass: "amcmbhyrifekijns",
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
