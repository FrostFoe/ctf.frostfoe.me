import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "lib", "db.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData.users);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
