import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;

export async function POST(request: Request) {
  console.log("REGISTER ROUTE HIT");

  try {
    const { email, username, password, fullName, age, ticket, teamMembers } =
      await request.json();

    console.log("REGISTER BODY", { email, username, fullName, age, ticket, hasPassword: !!password });

    if (
      (!username || !usernameRegex.test(username)) &&
      (!email || !emailRegex.test(email))
    ) {
      console.warn("INVALID EMAIL & USERNAME FORMAT", { email, username });
      return NextResponse.json(
        { message: "Invalid email and username format", code: "INVALID_EMAIL_USERNAME_FORMAT" },
        { status: 400 }
      );
    }

    if (!email || !emailRegex.test(email)) {
      console.warn("INVALID EMAIL FORMAT", email);
      return NextResponse.json(
        { message: "Invalid email format", code: "INVALID_EMAIL_FORMAT" },
        { status: 400 }
      );
    }

    if (!username || !usernameRegex.test(username)) {
      console.warn("INVALID USERNAME FORMAT", username);
      return NextResponse.json(
        { message: "Invalid username format", code: "INVALID_USERNAME_FORMAT" },
        { status: 400 }
      );
    }

    if (!password) {
      console.warn("PASSWORD REQUIRED");
      return NextResponse.json(
        { message: "Password is required", code: "PASSWORD_REQUIRED" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    console.log("PASSWORD HASHED");

    // Insert into users table
    console.log("INSERTING USER...");
    const response = await sql`
      INSERT INTO users (email, username, password, full_name, age, ticket)
      VALUES (${email}, ${username}, ${hashedPassword}, ${fullName}, ${age}, ${ticket}) 
      RETURNING id
    `;

    const userId = response.rows[0].id;
    console.log("USER CREATED WITH ID", userId);

    // Insert into game_data table
    // console.log("INSERTING GAME DATA...");
    // await sql`
    //   INSERT INTO game_data (team_id)
    //   VALUES (${userId})
    // `;
    // console.log("GAME DATA INSERTED");

    // Insert missions
    console.log("INSERTING MISSIONS...");
    await sql`INSERT INTO missions (team_id, mission) VALUES (${userId}, ${1})`;
    await sql`INSERT INTO missions (team_id, mission) VALUES (${userId}, ${2})`;
    await sql`INSERT INTO missions (team_id, mission) VALUES (${userId}, ${3})`;
    console.log("MISSIONS INSERTED");

    // Insert team members
    // console.log("INSERTING TEAM MEMBERS...");
    // await sql`
    //   INSERT INTO team_members (team_id, member_name, member_email)
    //   VALUES (${userId}, ${teamMembers[0].name}, ${email})
    // `;
    // console.log("TEAM LEADER INSERTED");

    // if (teamMembers && Array.isArray(teamMembers) && teamMembers.length > 1) {
    //   for (const member of teamMembers) {
    //     if (member.name === teamMembers[0].name) continue;
    //     if (
    //       typeof member.email === "string" &&
    //       member.email.trim() !== "" &&
    //       emailRegex.test(member.email)
    //     ) {
    //       console.log("INSERTING TEAM MEMBER", member);
    //       await sql`
    //         INSERT INTO team_members (team_id, member_name, member_email)
    //         VALUES (${userId}, ${member.name}, ${member.email})
    //       `;
    //     } else {
    //       console.warn("INVALID TEAM MEMBER EMAIL", member);
    //       return NextResponse.json(
    //         { message: "Invalid team member email", code: "INVALID_TEAM_MEMBER_EMAIL" },
    //         { status: 400 }
    //       );
    //     }
    //   }
    //   console.log("ALL TEAM MEMBERS INSERTED");
    // }

    console.log("REGISTER SUCCESS", userId);
    return NextResponse.json({ message: "Success" });

  } catch (e: any) {
    console.error("REGISTER ERROR", {
      code: e.code,
      message: e.message,
      detail: e.detail,
      constraint: e.constraint,
      table: e.table,
    });

    if (e.code === "23505") {
      if (e.message.includes("users_lower_idx")) {
        return NextResponse.json({ message: "Email already exists", code: "EMAIL_EXISTS" }, { status: 400 });
      }
      if (e.message.includes("users_username_key")) {
        return NextResponse.json({ message: "Username already exists", code: "USERNAME_EXISTS" }, { status: 400 });
      }
    }

    return NextResponse.json({ message: "An error occurred", code: "UNKNOWN_ERROR" }, { status: 500 });
  }
}
