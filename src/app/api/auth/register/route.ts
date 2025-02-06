import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();

    if (
      (!username || !usernameRegex.test(username)) &&
      (!email || !emailRegex.test(email))
    ) {
      return NextResponse.json(
        {
          message: "Invalid email and username format",
          code: "INVALID_EMAIL_USERNAME_FORMAT",
        },
        {
          status: 400,
        }
      );
    }
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
    if (!username || !usernameRegex.test(username)) {
      return NextResponse.json(
        {
          message: "Invalid username format",
          code: "INVALID_USERNAME_FORMAT",
        },
        {
          status: 400,
        }
      );
    }
    if (!password) {
      return NextResponse.json(
        {
          message: "Password is required",
          code: "PASSWORD_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hash(password, 10);

    const response = await sql`
    INSERT INTO users (email, username, password)
    VALUES (${email}, ${username}, ${hashedPassword}) 
    `;
  } catch (e: any) {
    if (e.code === "23505") {
      if (e.message.includes("unique_lowercase_email")) {
        return NextResponse.json(
          { message: "Email already exists", code: "EMAIL_EXISTS" },
          { status: 400 }
        );
      }
      if (
        e.message.includes("unique_username") ||
        e.message.includes("unique_lowercase_username")
      ) {
        return NextResponse.json(
          { message: "Username already exists", code: "USERNAME_EXISTS" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Success" });
}
