import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const response = await sql`
          SELECT username, hintsused, timecompleted, role FROM users WHERE role='player'
        `;
    return NextResponse.json({ message: "Success", result: response.rows });
  } catch (e: any) {
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
