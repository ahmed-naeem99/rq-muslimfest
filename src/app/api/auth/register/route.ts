import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;

export async function POST(request: Request) {
  try {
    console.log("➡️ Incoming register request");

    const { email, username, password, fullName, age, ticket, teamMembers } =
      await request.json();

    console.log("📥 Parsed body:", {
      email,
      username,
      password: password ? "✅ provided" : "❌ missing",
      fullName,
      age,
      ticket,
      teamMembers,
    });

    if (
      (!username || !usernameRegex.test(username)) &&
      (!email || !emailRegex.test(email))
    ) {
      console.log("❌ Both email and username invalid");
      return NextResponse.json(
        { message: "Invalid email and username format", code: "INVALID_EMAIL_USERNAME_FORMAT" },
        { status: 400 }
      );
    }
    if (!email || !emailRegex.test(email)) {
      console.log("❌ Invalid email format");
      return NextResponse.json(
        { message: "Invalid email format", code: "INVALID_EMAIL_FORMAT" },
        { status: 400 }
      );
    }
    if (!username || !usernameRegex.test(username)) {
      console.log("❌ Invalid username format");
      return NextResponse.json(
        { message: "Invalid username format", code: "INVALID_USERNAME_FORMAT" },
        { status: 400 }
      );
    }
    if (!password) {
      console.log("❌ Missing password");
      return NextResponse.json(
        { message: "Password is required", code: "PASSWORD_REQUIRED" },
        { status: 400 }
      );
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await hash(password, 10);

    console.log("📝 Inserting into users table...");
    const response = await sql`
      INSERT INTO users (email, username, password, full_name, age, ticket)
      VALUES (${email}, ${username}, ${hashedPassword}, ${fullName}, ${age}, ${ticket}) 
      RETURNING id
    `;

    const userId = response.rows[0].id;
    console.log("✅ User inserted with id:", userId);

    console.log("📝 Inserting into game_data table...");
    await sql`
      INSERT INTO game_data (team_id)
      VALUES (${userId})
    `;
    console.log("✅ game_data insert done");

    console.log("📝 Inserting missions (1,2,3) for user:", userId);
    await sql`INSERT INTO missions (user_id, mission) VALUES (${userId}, ${1})`;
    await sql`INSERT INTO missions (user_id, mission) VALUES (${userId}, ${2})`;
    await sql`INSERT INTO missions (user_id, mission) VALUES (${userId}, ${3})`;
    console.log("✅ Missions inserted");

    console.log("📝 Inserting self into team_members...");
    if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
      console.log("⚠️ No teamMembers provided, skipping team insert");
    } else {
      await sql`
        INSERT INTO team_members (team_id, member_name, member_email)
        VALUES (${userId}, ${teamMembers[0].name}, ${email})
      `;
      console.log("✅ Added user as team member");

      if (teamMembers.length > 1) {
        for (const member of teamMembers) {
          if (member.name === teamMembers[0].name) {
            console.log("↩️ Skipping duplicate self member:", member);
            continue;
          }
          if (
            typeof member.email === "string" &&
            member.email.trim() !== "" &&
            emailRegex.test(member.email)
          ) {
            console.log("📝 Adding extra team member:", member);
            await sql`
              INSERT INTO team_members (team_id, member_name, member_email)
              VALUES (${userId}, ${member.name}, ${member.email})
            `;
          } else {
            console.log("❌ Invalid team member email:", member);
            return NextResponse.json(
              { message: "Invalid team member email", code: "INVALID_TEAM_MEMBER_EMAIL" },
              { status: 400 }
            );
          }
        }
      }
    }

  } catch (e: any) {
    console.error("💥 Error in register route:", e);

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
      { message: "An error occurred", code: "UNKNOWN_ERROR", detail: e.message },
      { status: 500 }
    );
  }

  console.log("🎉 Registration flow finished successfully");
  return NextResponse.json({ message: "Success" });
}
