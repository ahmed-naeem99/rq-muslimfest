import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;

export async function POST(request: Request) {
  try {
    const { email, username, password, teamMembers, ticket } =
      await request.json();

    if (
      (!username || !usernameRegex.test(username)) &&
      (!email || !emailRegex.test(email))
    ) {
      return NextResponse.json(
        {
          message: "Invalid email and username format",
          code: "INVALID_EMAIL_USERNAME_FORMAT",
        },
        {
          status: 400,
        }
      );
    }
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
          code: "INVALID_EMAIL_FORMAT",
        },
        {
          status: 400,
        }
      );
    }
    if (!username || !usernameRegex.test(username)) {
      return NextResponse.json(
        {
          message: "Invalid username format",
          code: "INVALID_USERNAME_FORMAT",
        },
        {
          status: 400,
        }
      );
    }
    if (!password) {
      return NextResponse.json(
        {
          message: "Password is required",
          code: "PASSWORD_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hash(password, 10);

    // Insert into users table
    const response = await sql`
    INSERT INTO users (email, username, password, ticket)
    VALUES (${email}, ${username}, ${hashedPassword}, ${ticket}) 
    RETURNING id
    `;

    const userId = response.rows[0].id;

    // Insert into game_data table
    await sql`
    INSERT INTO game_data (team_id)
    VALUES (${userId})
    `;

    // Insert into missions table
    await sql`
    INSERT INTO missions (team_id, mission) 
    VALUES (${userId}, ${1})
    `;

    // Insert the user themselves into team_members table, then add team members
    await sql`
    INSERT INTO team_members (team_id, member_name, member_email)
    VALUES (${userId}, ${teamMembers[0].name}, ${email})
    `;

    if (teamMembers && Array.isArray(teamMembers) && teamMembers.length > 1) {
      for (const memberUsername of teamMembers) {
        if (memberUsername.name === teamMembers[0].name) {
          continue;
        }
        if (
          typeof memberUsername.email === "string" &&
          memberUsername.email.trim() !== "" &&
          emailRegex.test(memberUsername.email)
        ) {
          await sql`
          INSERT INTO team_members (team_id, member_name, member_email)
          VALUES (${userId}, ${memberUsername.name}, ${memberUsername.email})
          `;
        } else {
          return NextResponse.json(
            {
              message: "Invalid team member email",
              code: "INVALID_TEAM_MEMBER_EMAIL",
            },
            {
              status: 400,
            }
          );
        }
      }
    }
  } catch (e: any) {
    console.log(e);
    if (e.code === "23505") {
      if (e.message.includes("users_lower_idx")) {
        return NextResponse.json(
          { message: "Email already exists", code: "EMAIL_EXISTS" },
          { status: 400 }
        );
      }
      if (e.message.includes("users_username_key")) {
        return NextResponse.json(
          { message: "Username already exists", code: "USERNAME_EXISTS" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Success" });
}
