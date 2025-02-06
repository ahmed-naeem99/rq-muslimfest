import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const response = await sql`
          SELECT username, hintsused, timecompleted, role FROM users
        `;
    return NextResponse.json(
      { message: "Success", result: response.rows },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
