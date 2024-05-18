import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const response = await sql`
    UPDATE users
    SET currentmission = ${req.setMission}, timecompleted = CURRENT_TIMESTAMP AT TIME ZONE 'America/New_York'
    WHERE username = ${req.username};
      `;

    if (response.rowCount != 1) {
      return NextResponse.json(
        { message: "An error occurred", code: "UNKNOWN_ERROR" },
        { status: 500 }
      );
    }
  } catch (e: any) {
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Success" });
}
