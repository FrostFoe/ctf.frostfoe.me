import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "lib", "data.json");

interface DataStore {
  events: any[];
  challenges: any[];
  achievements: any[];
  users: any[];
  user_profiles: any[];
  user_stats: any[];
  user_achievements: any[];
  activities: any[];
  challenge_submissions: any[];
  completed_challenges: any[];
  event_participations: any[];
  teams: any[];
  team_members: any[];
  user_settings: any[];
  user_challenge_hints: any[];
  sessions: any;
  settings: any;
}

export async function GET() {
  try {
    const data: DataStore = JSON.parse(await fs.readFile(dataPath, "utf-8"));
    return NextResponse.json(data.settings);
  } catch (error) {
    console.error("Error reading data.json:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json();
    const data: DataStore = JSON.parse(await fs.readFile(dataPath, "utf-8"));
    data.settings = newSettings;
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    return NextResponse.json(newSettings, { status: 200 });
  } catch (error) {
    console.error("Error writing data.json:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
