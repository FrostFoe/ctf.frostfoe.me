import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { User } from "@/lib/auth";

const dataPath = path.join(process.cwd(), "src", "lib", "data.json");

export async function DELETE(
  _request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  try {
    const { id } = await params;
    const data = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(data);
    const userIndex = jsonData.users.findIndex((user: User) => user.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    jsonData.users.splice(userIndex, 1);
    await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
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
    const { role } = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const jsonData = JSON.parse(data);
    const userIndex = jsonData.users.findIndex((user: User) => user.id === id);

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    jsonData.users[userIndex].role = role;
    await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json(jsonData.users[userIndex]);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}