import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const response = await sql`
      UPDATE missions
      SET hints_used = GREATEST(hints_used, ${req.hintNum})
      WHERE user_id = ${req.user_id}
      AND mission = ${req.mission};
    `;

    if (response.rowCount !== 1) {
      return NextResponse.json(
        { message: "No matching mission found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Success" });

  } catch (e: any) {
    console.error("❌ updateHints error:", e);
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
