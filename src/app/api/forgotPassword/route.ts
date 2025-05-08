import { NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from "@vercel/postgres";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendResetEmail = async (email: string, resetUrl: string) => {
  const mailOptions = {
    from: '"MAC Reality Quest Support" <macrealityquest@outlook.com>',
    to: email,
    subject: "Password Reset Link",
    text: `You have requested a password reset. Click the following link to reset your password: ${resetUrl}`,
    html: `<p>You have requested a password reset. Click the link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
          code: "INVALID_EMAIL_FORMAT",
        },
        {
          status: 400,
        }
      );
    }

    const response = await sql`
    SELECT * FROM users WHERE email=${email}`;

    const user = response.rows[0];

    if (!user) {
      return NextResponse.json(
        {
          message: "Email not found",
          code: "EMAIL_NOT_FOUND",
        },
        {
          status: 404,
        }
      );
    } else {
      //email the user a link to reset their password
      const urlResetToken = crypto.randomBytes(20).toString("hex");
      const dbResetToken = crypto
        .createHash("sha256")
        .update(urlResetToken)
        .digest("hex");

      const passwordResetExpiry = Date.now() + 3600000;

      await sql`
            UPDATE users SET passwordresettoken=${dbResetToken}, passwordresetexpiry=${passwordResetExpiry} WHERE email=${email}`;

      const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${urlResetToken}`;

      await sendResetEmail(email, resetUrl);
    }
  } catch (e: any) {
    return NextResponse.json(
      { message: "An error occurred, try again", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
