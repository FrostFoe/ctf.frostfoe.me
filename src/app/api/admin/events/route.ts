import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "lib", "db.json");

export async function POST(request: NextRequest) {
  try {
    const newEvent = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(data);

    newEvent.id = jsonData.events.length + 1;
    jsonData.events.push(newEvent);

    await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData.events);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}