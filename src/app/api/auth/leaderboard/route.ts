import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await sql`SELECT * FROM users`;
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
