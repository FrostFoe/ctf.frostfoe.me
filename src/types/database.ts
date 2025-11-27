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
