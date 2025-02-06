import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { password, user } = await request.json();

    const hashedPassword = await hash(password, 10);

    const response = await sql`
          SELECT passwordresetexpiry FROM users WHERE email=${user.data.email}`;

    const userData = response.rows[0];

    if (!userData) {
      throw new Error("User not found");
    }

    if (userData.passwordresetexpiry < Date.now()) {
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

    await sql`
          UPDATE users SET password=${hashedPassword}, passwordresettoken=${null}, passwordresetexpiry=${null} WHERE email=${
      user.data.email
    }`;

    return NextResponse.json(
      {
        message: "Success",
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: "An error occurred.", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
