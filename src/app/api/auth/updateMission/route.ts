import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const response = await sql`
    UPDATE missions
    SET time_completed = CURRENT_TIMESTAMP AT TIME ZONE 'UTC'
    WHERE user_id = ${req.user_id}
    AND mission = ${req.mission}
    RETURNING *;
      `;

    if (response.rowCount != 1) {
      return NextResponse.json(
        { message: "An error occurred", code: "UNKNOWN_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Success", result: response.rows[0] },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
