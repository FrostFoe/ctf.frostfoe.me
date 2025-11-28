import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src", "lib", "db.json");

export async function GET(
  _request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const { id } = await params;
    const data = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(data);
    const event = jsonData.events.find(
      (event: { id: number }) => event.id.toString() === id
    );

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error reading db.json:", error);
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
    const updatedEvent = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(data);
    const eventIndex = jsonData.events.findIndex(
      (event: { id: number }) => event.id.toString() === id
    );

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    jsonData.events[eventIndex] = { ...jsonData.events[eventIndex], ...updatedEvent };
    await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json(jsonData.events[eventIndex]);
  } catch (error) {
    console.error("Error updating event:", error);
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
    const eventIndex = jsonData.events.findIndex(
      (event: { id: number }) => event.id.toString() === id
    );

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    jsonData.events.splice(eventIndex, 1);
    await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}