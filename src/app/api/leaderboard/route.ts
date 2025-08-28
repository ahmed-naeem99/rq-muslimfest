import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const missionNum = req.mission;

    // Check if missionNum is provided
    if (!missionNum) {
      return NextResponse.json(
        { message: "Mission number is required", code: "MISSION_REQUIRED" },
        { status: 400 }
      );
    }

    // Updated query with the correct columns
    const missionResponse = await sql`
      SELECT m.user_id, m.time_completed, m.hints_used, u.username
      FROM missions m
      JOIN users u ON m.user_id = u.id
      WHERE m.mission = ${missionNum}
      AND m.time_completed IS NOT NULL
    `;

    // Check if we got any results
    if (!missionResponse.rows || missionResponse.rows.length === 0) {
      return NextResponse.json(
        { message: "No data found for this mission", result: [] },
        { status: 200 }
      );
    }

    // Process the data
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
    console.error("Error in leaderboard API:", e);
    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR", error: e.message },
      { status: 500 }
    );
  }
}