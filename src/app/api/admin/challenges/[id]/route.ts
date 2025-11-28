import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "lib", "data.json");

export async function GET(
  _request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { params }: any
  ) {
    try {
      const { id } = await params;
      const data = await fs.readFile(dataPath, "utf-8");
      const jsonData = JSON.parse(data);
      const challenge = jsonData.challenges.find(
        (challenge: { id: number }) => challenge.id.toString() === id
      );
  
      if (!challenge) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
      }
  
      return NextResponse.json(challenge);
    } catch (error) {
      console.error("Error reading data.json:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  
  export async function PUT(
    request: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { params }: any
  ) {
    try {
      const { id } = await params;
      const updatedChallenge = await request.json();
      const data = await fs.readFile(dataPath, "utf-8");
      const jsonData = JSON.parse(data);
      const challengeIndex = jsonData.challenges.findIndex(
        (challenge: { id: number }) => challenge.id.toString() === id
      );
  
      if (challengeIndex === -1) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
      }
  
      jsonData.challenges[challengeIndex] = {
        ...jsonData.challenges[challengeIndex],
        ...updatedChallenge,
      };
      await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));
  
      return NextResponse.json(jsonData.challenges[challengeIndex]);
    } catch (error) {
      console.error("Error updating challenge:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(
    _request: Request,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { params }: any
  ) {
    try {
      const { id } = await params;
      const data = await fs.readFile(dataPath, "utf-8");
      const jsonData = JSON.parse(data);
      const challengeIndex = jsonData.challenges.findIndex(
        (challenge: { id: number }) => challenge.id.toString() === id
      );
  
      if (challengeIndex === -1) {
        return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
      }
  
      jsonData.challenges.splice(challengeIndex, 1);
      await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));
  
      return NextResponse.json({ message: "Challenge deleted successfully" });
    } catch (error) {
      console.error("Error deleting challenge:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  