import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const missionNum = req.mission;

    // Keep the initial query to get mission data
    const missionResponse = await sql`
          SELECT m.team_id, m.time_completed, m.hints_used, u.username
          FROM missions m
          JOIN users u ON m.team_id = u.id
          WHERE u.role = 'player'
          AND m.time_completed IS NOT NULL
          AND m.mission = ${missionNum}
        `;

    const leaderboard = missionResponse.rows.map((row) => ({
      username: row.username,
      timecompleted: row.time_completed,
      hintsused: row.hints_used,
      finaltime: new Date(
        row.time_completed.getTime() + row.hints_used * 10 * 60 * 1000
      ),
    }));

    leaderboard.sort((a, b) => a.finaltime.getTime() - b.finaltime.getTime());

    return NextResponse.json(
      { message: "Success", result: leaderboard },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
}
