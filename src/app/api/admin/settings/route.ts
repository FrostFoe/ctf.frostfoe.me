import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "lib", "settings.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error("Error reading settings.json:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json();
    await fs.writeFile(dataPath, JSON.stringify(newSettings, null, 2));
    return NextResponse.json(newSettings, { status: 200 });
  } catch (error) {
    console.error("Error writing settings.json:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
