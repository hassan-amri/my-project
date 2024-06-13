import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function DELETE(request) {
  try {
    const { id } = await request.json(); // Assuming the ID is sent as JSON
    
    // Additional validation/sanitization of input values
    
    const db = await pool.getConnection();
    const query = "DELETE FROM customer WHERE id = ?";
    await db.execute(query, [id]);
    db.release();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
