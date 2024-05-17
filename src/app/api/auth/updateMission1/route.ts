import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    console.log(req);

    const response = await sql`
    UPDATE users
    SET currentmission = ${req.setMission}, timecompleted = CURRENT_TIMESTAMP
    WHERE username = ${req.username};
      `;

    // console.log(response);

    if (response.rowCount != 1) {
      return NextResponse.json(
        { message: "An error occurred", code: "UNKNOWN_ERROR" },
        { status: 500 }
      );
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Success" });
}
