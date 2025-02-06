import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const response = await sql`
          SELECT email, passwordresettoken, passwordresetexpiry FROM users WHERE passwordresettoken=${hashedToken}`;

    const user = response.rows[0];
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid token",
          code: "INVALID_TOKEN",
        },
        {
          status: 400,
        }
      );
    }

    if (user.passwordresetexpiry < Date.now()) {
      await sql`
            UPDATE users SET passwordresettoken=${null}, passwordresetexpiry=${null} WHERE email=${
        user.email
      }`;
    }

    return NextResponse.json(
      {
        message: "Success",
        result: user,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
