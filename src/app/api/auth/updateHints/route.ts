import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    console.log(req);

    const columnName = `hints${req.currMiss}used`;

    if (columnName === "hints1used") {
      const response = await sql`
            UPDATE users
            SET hintsused = hintsused + 1, hints1used = hints1used + 1
            WHERE username = ${req.username};
        `;
      if (response.rowCount != 1) {
        return NextResponse.json(
          { message: "An error occurred", code: "UNKNOWN_ERROR" },
          { status: 500 }
        );
      }
    } else if (columnName === "hints2used") {
      const response = await sql`
            UPDATE users
            SET hintsused = hintsused + 1, hints2used = hints2used + 1
            WHERE username = ${req.username};
            `;
      if (response.rowCount != 1) {
        return NextResponse.json(
          { message: "An error occurred", code: "UNKNOWN_ERROR" },
          { status: 500 }
        );
      }
    } else if (columnName === "hints3used") {
      const response = await sql`
            UPDATE users
            SET hintsused = hintsused + 1, hints3used = hints3used + 1
            WHERE username = ${req.username};
            `;
      if (response.rowCount != 1) {
        return NextResponse.json(
          { message: "An error occurred", code: "UNKNOWN_ERROR" },
          { status: 500 }
        );
      }
    } else {
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
