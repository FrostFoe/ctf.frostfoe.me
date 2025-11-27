import fs from "fs";
import path from "path";

// Simple in-memory session store for demo
interface GlobalWithSessionStore {
  sessionStore?: Map<string, User>;
}

const globalWithSessionStore = global as GlobalWithSessionStore;
const sessionStore = (globalWithSessionStore.sessionStore = globalWithSessionStore.sessionStore || new Map<string, User>());

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: "player" | "admin";
}

export async function login(credentials: { username: string; password: string }) {
  const { username, password } = credentials;

  if (!username || !password) {
    return { error: "Username and password are required", status: 400 };
  }

  // Read data.json
  const dataPath = path.join(process.cwd(), "src", "lib", "data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // Find user
  const user = data.users.find((u: User) => u.username === username && u.password === password);

  if (!user) {
    return { error: "Invalid credentials", status: 401 };
  }

  // Create session
  const sessionId = Math.random().toString(36).substring(7);

  // Store user in session
  sessionStore.set(sessionId, user);

  return {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    },
    sessionId,
  };
}

export async function signup(credentials: { username: string; password: string }) {
  const { username, password } = credentials;

  if (!username || !password) {
    return { error: "Username and password are required", status: 400 };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters", status: 400 };
  }

  // Read data.json
  const dataPath = path.join(process.cwd(), "src", "lib", "data.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // Check if user already exists
  const existingUser = data.users.find((u: User) => u.username === username);
  if (existingUser) {
    return { error: "Username already exists", status: 409 };
  }

  // Create new user
  const newUser: User = {
    id: (data.users.length + 1).toString(),
    username,
    password, // In real app, hash this
    name: username, // Default name
    role: "player",
  };

  data.users.push(newUser);

  // Write back to file
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  // Create session
  const sessionId = Math.random().toString(36).substring(7);

  sessionStore.set(sessionId, newUser);

  return {
    user: {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
    },
    sessionId,
  };
}

export async function logout(sessionId: string) {
  if (sessionId) {
    sessionStore.delete(sessionId);
  }
  return { success: true };
}

export async function getMe(sessionId: string) {
  if (!sessionId) {
    return { user: null };
  }

  const user = sessionStore.get(sessionId);

  if (!user) {
    return { user: null };
  }

  return {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    },
  };
}