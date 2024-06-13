import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function POST(request) {
  try {
    const { name, email } = await request.json(); // Assuming the data is sent as JSON
    
    // Additional validation/sanitization of input values
    
    const db = await pool.getConnection();
    const query = "INSERT INTO customer (name, email) VALUES (?, ?)";
    await db.execute(query, [name, email]);
    db.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
