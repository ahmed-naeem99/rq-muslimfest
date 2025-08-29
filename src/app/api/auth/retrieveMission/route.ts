import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const response = await sql`
    SELECT * FROM missions
    WHERE user_id = ${req.user_id}
    AND mission = ${String(req.mission)};
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
