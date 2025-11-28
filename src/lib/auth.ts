import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { sanitize } from "./utils";

const dataPath = path.join(process.cwd(), "src", "lib", "data.json");
const sessionsPath = path.join(process.cwd(), "src", "lib", "sessions.json");

interface Session {
  [key: string]: User;
}

// For a production application, you should use a more robust session store like Redis or a database.
// This file-based session store is for demonstration purposes only.
async function readSessions(): Promise<Session> {
  try {
    const data = await fs.readFile(sessionsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _error = error;
    return {};
  }
}

async function writeSessions(sessions: Session) {
  await fs.writeFile(sessionsPath, JSON.stringify(sessions, null, 2));
}

export interface User {
  id: string;
  username: string;
  password?: string; // Make password optional as it will be removed from the user object sent to the client
  role: "player" | "admin";
}


export async function login(credentials: { username:string; password: string }) {
  const { username, password } = credentials;

  if (!username || !password) {
    return { error: "Username and password are required", status: 400 };
  }

  const sanitizedUsername = sanitize(username);
  const sanitizedPassword = sanitize(password);

  // Read data.json
  const data = JSON.parse(await fs.readFile(dataPath, "utf-8"));

  // Find user
  const user = data.users.find((u: User) => u.username === sanitizedUsername);

  if (!user) {
    return { error: "Invalid credentials", status: 401 };
  }

  // Compare passwords
  const isValid = sanitizedPassword === user.password;

  if (!isValid) {
    return { error: "Invalid credentials", status: 401 };
  }

  // Create session
  const sessionId = crypto.randomUUID();
  const sessions = await readSessions();
  sessions[sessionId] = user;
  await writeSessions(sessions);

  // Remove password from user object before returning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;


  return {
    user: userWithoutPassword,
    sessionId,
  };
}

export async function signup(credentials: { username: string; password: string }) {
  const { username, password } = credentials;

  if (!username || !password) {
    return { error: "Username and password are required", status: 400 };
  }

  const sanitizedUsername = sanitize(username);
  const sanitizedPassword = sanitize(password);

  if (sanitizedPassword.length < 6) {
    return { error: "Password must be at least 6 characters", status: 400 };
  }

  // Read data.json
  const data = JSON.parse(await fs.readFile(dataPath, "utf-8"));

  // Check if user already exists
  const existingUser = data.users.find((u: User) => u.username === sanitizedUsername);
  if (existingUser) {
    return { error: "Username already exists", status: 409 };
  }

  // Create new user
  const newUser: User = {
    id: (data.users.length + 1).toString(),
    username: sanitizedUsername,
    password: sanitizedPassword,
    role: "player",
  };

  data.users.push(newUser);

  // Write back to file
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));

  // Create session
  const sessionId = crypto.randomUUID();
  const sessions = await readSessions();
  sessions[sessionId] = newUser;
  await writeSessions(sessions);

  // Remove password from user object before returning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser;

  return {
    user: userWithoutPassword,
    sessionId,
  };
}

export async function logout(sessionId: string) {
  const sessions = await readSessions();
  if (sessionId && sessions[sessionId]) {
    delete sessions[sessionId];
    await writeSessions(sessions);
  }
  return { success: true };
}

export async function getMe(sessionId: string) {
  if (!sessionId) {
    return { user: null };
  }

  const sessions = await readSessions();
  const user = sessions[sessionId];

  if (!user) {
    return { user: null };
  }

  // Remove password from user object before returning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
  };
}