import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const missionNum = req.mission;

    const missionResponse = await sql`
          SELECT m.team_id, m.time_completed, m.hints_used, u.username
          FROM missions m
          JOIN users u ON m.team_id = u.id
          WHERE u.role = 'player'
          AND m.time_completed IS NOT NULL
          AND m.mission = ${missionNum}
          ORDER BY m.time_completed ASC
        `;

    const leaderboard = missionResponse.rows.map((row) => ({
      username: row.username,
      timecompleted: row.time_completed,
      hintsused: row.hints_used,
      finaltime: new Date(
        row.time_completed.getTime() + row.hints_used * 10 * 60 * 1000
      ),
    }));

    return NextResponse.json(
      { message: "Success", result: leaderboard },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
