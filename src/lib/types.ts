/**
 * All TypeScript type definitions for the CTF platform
 */

/**
 * Database type definitions for Supabase
 * Generated from schema introspection
 */
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          password: string;
          role: "player" | "admin";
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          password: string;
          role?: "player" | "admin";
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          password?: string;
          role?: "player" | "admin";
          created_at?: string;
        };
      };
    };
  };
};

/**
 * CTF Data Types
 * Defines the shape of CTF events, challenges, and related data
 */

export type CTFStatus =
  | "ongoing"
  | "upcoming"
  | "ended"
  | "registration-closed";
export type CTFType = "single" | "series";
export type Difficulty =
  | "সহজ"
  | "মাঝারি"
  | "কঠিন"
  | "অসম্ভব"
  | "মধ্যম"
  | "মাঝারি থেকে কঠিন";

export interface CTFEvent {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  date?: string;
  image?: string;
  badge?: string;
  tags?: string[];
  players?: number;
  status: CTFStatus;
  ctfType?: CTFType;
  totalChallenges?: number;
  completedChallenges?: number;
  rules?: string;
  prizes?: string[];
  skillLevel?: string;
  description?: string;
  format?: string;
  teamSize?: number;
  difficulty?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  hostedBy?: string;
  hostedByLogo?: string;
  going?: number;
  teams?: number;
  playerAvatars?: string[];
  type?: string;
  location?: string;
  scenarios?: string;
}

export interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  points: number;
  solves: number;
  successRate?: string;
  author?: string;
  hints?: string[];
  tags?: string[];
  eventId?: number;
  seriesId?: string;
  seriesOrder?: number | null;
  isCompleted?: boolean;
}

export interface CTFData {
  events: CTFEvent[];
  challenges: Challenge[];
}